import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      ssr: false,
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route('/about', 'routes/about/About.tsx');
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
