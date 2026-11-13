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

React Router 8 in **framework mode** (SSR), deployed as a Cloudflare Pages site. React Router 8 requires Node `>=22.22.0`; Cloudflare Pages' build system does **not** read `package.json`'s `engines.node` (that's a Netlify convention) — the Node version it uses comes from `.nvmrc`/`.node-version` or a `NODE_VERSION` build environment variable, so keep `.nvmrc` in sync with any future Node floor bump or the deploy will fail even though local builds succeed. Node/Vite dev via `react-router dev`; production request handling goes through `functions/[[path]].ts`, which wraps the built server bundle with `@react-router/cloudflare`'s `createPagesFunctionHandler`. That handler requires a `getLoadContext` returning a `RouterContextProvider` (react-router 8's middleware-context system) — currently just `new RouterContextProvider()` since no loader reads Cloudflare bindings (KV/D1/env) today. If that ever changes, populate the context there.

**This is a Pages project, not a Workers project.** `wrangler.toml` is Pages configuration (`pages_build_output_dir`), which accepts only a subset of Wrangler's keys; Workers-only settings such as `[cache]`, `main` or `[assets]` are invalid here and show up as errors in the Cloudflare deploy logs (a `[cache]` block was added once and had to be removed). Pages Functions run on the Workers runtime, so Workers APIs like `caches.default` are available, but they are used from code, not switched on in config. Check the Pages docs, not the Workers docs, before adding anything to `wrangler.toml`.

### Routing

`app/routes.ts` mixes `@react-router/fs-routes`' `flatRoutes()` (file-based routes under `app/routes/`) with a handful of explicit `route()` calls for parameterized/shared paths — notably `downloads/:id`, `downloads/:id/:subid`, and a static `downloads/shoko-server` override that reuses the same `downloadSingle.tsx` component/loader as the dynamic route (distinguished by a route `id`, not a param — `params.id` is `undefined` on that static route, so its loader can't rely on `params` alone).

**Loader convention:** destructure `url` from loader args rather than constructing `new URL(request.url)`. React Router 8 passes the raw `Request` through (no more synthetic normalized `Request`), so `request.url` can carry a `.data` suffix and internal search params on client-side data requests; the framework-provided `url` argument is always the normalized one. Same applies to `meta` functions: use `loaderData`, not the deprecated `data`.

### Content system

Blog posts and downloads content are MDX files with YAML frontmatter under `app/content/{posts,downloads/<category>}/`, not backed by a CMS or runtime filesystem reads (there is no filesystem at the Cloudflare Workers runtime). `app/lib/contentLoader.ts` uses Vite's `import.meta.glob('/app/content/**/*.mdx', { query: '?raw' })` to statically enumerate and load all content at build time, then parses frontmatter with `gray-matter`. The `contentPaths` map in that file is the single source of truth for valid `type` values (`blog`, `shoko-server`, `media-player-plugins`, `webui-themes`, `renamer-plugins`, `legacy-apps`) — adding a new downloads category means adding both the content directory and an entry here.

The `app/routes/api.*.ts` routes (`getFiles`, `getFile`, `getAllTags`, `getDownloadCounts`, `getGitHubRelease.$owner.$repository`) are internal endpoints layered on `contentLoader`, called via client-side `fetch()` from route components (for pagination/tag-filtering/infinite-scroll) as well as from other loaders server-side. `getGitHubRelease` fetches live release/version info from GitHub's API for content that declares a `githubRepository` in its frontmatter.

### Plugin feeds

`/core-plugin-manifest.json` and `/community-plugin-manifest.json` are the Shoko server's default plugin repositories. Each is a YAML list of plugin manifest URLs in `app/content/plugin-feeds/<name>.yaml`, served by `app/routes/plugins/pluginManifest.ts` through `app/lib/pluginFeed.server.ts`: it fetches every manifest and serves one JSON list with every package inlined, with an `ETag` and `If-None-Match` support. The built feed stays in the Workers edge cache for 5 minutes, so a plugin release shows up within that without a deploy; each manifest's last good copy is kept for 7 days and served when it cannot be fetched. Adding a plugin is one line in the YAML, once, when it first releases. The Node dev server has no edge cache and builds the feed on every request.

### Static assets, caching, and feeds

`public/_routes.json` keeps static files (`/assets/*`, `/images/*`, `/fonts/*`, `/webui-themes/*`, `/favicon.ico`) from invoking the Pages Function, and `public/_headers` gives them their cache and CORS headers (one block per path — a repeated path stops the earlier block applying). Everything else, including every feed, is built by the Function.

**Never add a cache rule that covers feeds** — no `*.json`/`*.xml` pattern in `public/_headers` or in a Cloudflare Cache Rule, no feed path in `_routes.json`'s `exclude`, and no static copy of a feed under `public/`. The plugin feeds (`/core-plugin-manifest.json`, `/community-plugin-manifest.json`) and any blog feed must stay generated, with their own short `Cache-Control` and `ETag`; a long-lived cached or static copy is how a feed got stuck serving old content for a week. Add new feed paths to this list.

### OG image generation

`app/routes/api.ogImage.tsx` renders social preview images at request time using `satori` (JSX → SVG) + `@resvg/resvg-wasm` (SVG → PNG). The resvg wasm binary is loaded through `vite-plugin-wasm-module-workers`, which is why the build script has an extra step copying `*.wasm` from `build/client/assets` into `build/server/assets` — without it the Cloudflare Pages Function can't resolve the wasm module at runtime.

### Styling

Tailwind with a custom color palette defined as CSS variables (`shoko-bg`, `shoko-text`, `shoko-link`, etc., see `tailwind.config.ts` and `app/css/`) rather than literal Tailwind colors — use the `shoko-*` tokens for anything themeable.

### Adding content (from README, for contributor-facing changes)

- Blog posts: new `.mdx` file in `app/content/posts/`.
- Downloads: new `.mdx` file in the matching subfolder of `app/content/downloads/`.
- Either case: add the contributor to `app/data/contributors.ts`.
