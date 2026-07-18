# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm only** — `preinstall` runs `only-allow pnpm` and will hard-fail under npm/yarn.

```bash
pnpm install
pnpm dev          # react-router dev — Vite dev server, http://localhost:5173 (falls back to next free port)
pnpm build        # react-router build, then copies build/client/assets/*.wasm into build/server/assets
                   # (the wasm copy step is required — see OG image note below)
pnpm typecheck    # react-router typegen && tsc — regenerates .react-router/types/ before type-checking
pnpm lint         # eslint --cache (includes .mdx files via eslint-plugin-mdx)
pnpm start        # react-router-serve ./build/server/index.js — Node preview of the built app
```

There is no test suite in this repo (no `test` script).

`pnpm typecheck` must run `react-router typegen` first any time route files or `react-router.config.ts` change — route param types (`Route.LoaderArgs`, `+types/*`) are generated into `.react-router/types/` (gitignored) and go stale otherwise.

## Architecture

React Router 8 in **framework mode** (SSR), deployed as a Cloudflare Pages site. Node/Vite dev via `react-router dev`; production request handling goes through `functions/[[path]].ts`, which wraps the built server bundle with `@react-router/cloudflare`'s `createPagesFunctionHandler`. That handler requires a `getLoadContext` returning a `RouterContextProvider` (react-router 8's middleware-context system) — currently just `new RouterContextProvider()` since no loader reads Cloudflare bindings (KV/D1/env) today. If that ever changes, populate the context there.

### Routing

`app/routes.ts` mixes `@react-router/fs-routes`' `flatRoutes()` (file-based routes under `app/routes/`) with a handful of explicit `route()` calls for parameterized/shared paths — notably `downloads/:id`, `downloads/:id/:subid`, and a static `downloads/shoko-server` override that reuses the same `downloadSingle.tsx` component/loader as the dynamic route (distinguished by a route `id`, not a param — `params.id` is `undefined` on that static route, so its loader can't rely on `params` alone).

**Loader convention:** destructure `url` from loader args rather than constructing `new URL(request.url)`. React Router 8 passes the raw `Request` through (no more synthetic normalized `Request`), so `request.url` can carry a `.data` suffix and internal search params on client-side data requests; the framework-provided `url` argument is always the normalized one. Same applies to `meta` functions: use `loaderData`, not the deprecated `data`.

### Content system

Blog posts and downloads content are MDX files with YAML frontmatter under `app/content/{posts,downloads/<category>}/`, not backed by a CMS or runtime filesystem reads (there is no filesystem at the Cloudflare Workers runtime). `app/lib/contentLoader.ts` uses Vite's `import.meta.glob('/app/content/**/*.mdx', { query: '?raw' })` to statically enumerate and load all content at build time, then parses frontmatter with `gray-matter`. The `contentPaths` map in that file is the single source of truth for valid `type` values (`blog`, `shoko-server`, `media-player-plugins`, `webui-themes`, `renamer-plugins`, `legacy-apps`) — adding a new downloads category means adding both the content directory and an entry here.

The `app/routes/api.*.ts` routes (`getFiles`, `getFile`, `getAllTags`, `getDownloadCounts`, `getGitHubRelease.$owner.$repository`) are internal endpoints layered on `contentLoader`, called via client-side `fetch()` from route components (for pagination/tag-filtering/infinite-scroll) as well as from other loaders server-side. `getGitHubRelease` fetches live release/version info from GitHub's API for content that declares a `githubRepository` in its frontmatter.

### OG image generation

`app/routes/api.ogImage.tsx` renders social preview images at request time using `satori` (JSX → SVG) + `@resvg/resvg-wasm` (SVG → PNG). The resvg wasm binary is loaded through `vite-plugin-wasm-module-workers`, which is why the build script has an extra step copying `*.wasm` from `build/client/assets` into `build/server/assets` — without it the Cloudflare Pages Function can't resolve the wasm module at runtime.

### Styling

Tailwind with a custom color palette defined as CSS variables (`shoko-bg`, `shoko-text`, `shoko-link`, etc., see `tailwind.config.ts` and `app/css/`) rather than literal Tailwind colors — use the `shoko-*` tokens for anything themeable.

### Adding content (from README, for contributor-facing changes)

- Blog posts: new `.mdx` file in `app/content/posts/`.
- Downloads: new `.mdx` file in the matching subfolder of `app/content/downloads/`.
- Either case: add the contributor to `app/data/contributors.ts`.
