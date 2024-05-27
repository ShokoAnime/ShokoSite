import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';

installGlobals();

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
      ],
    }),
    remix({
      ssr: false,
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route('/about', 'routes/about/About.tsx');
          route('/blog', 'routes/blog/Blog.tsx');
          route('/blog/:id', 'routes/blog/BlogPost.tsx');
          route('/contributors', 'routes/contributors/Contributors.tsx');
          route('/downloads', 'routes/downloads/Downloads.tsx', { id: 'downloads' });
          route('/downloads/:id', 'routes/downloads/Downloads.tsx', { id: 'downloads-id' });
          route('/downloads/:id/:subid', 'routes/downloads/DownloadsSingle.tsx');
          route('*', 'routes/404.tsx', { id: '404' });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
