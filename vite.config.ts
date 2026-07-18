import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import wasmModuleWorkers from 'vite-plugin-wasm-module-workers';

export default defineConfig({
  plugins: [
    wasmModuleWorkers(),
    mdx({
      exclude: ['app/content/**/*.mdx'], //needed for v3_singleFetch: true
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
      ],
    }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_routeConfig: true,
        v3_singleFetch: true,
      },
    }),
    tsconfigPaths(),
  ],
});
