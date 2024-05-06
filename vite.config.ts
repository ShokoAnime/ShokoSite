import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route('/about', 'routes/about/index.tsx');
          route('/contributors', 'routes/contributors/index.tsx');
          route('/downloads/:id', 'routes/downloads/[id].tsx');
          route('*', 'routes/404.tsx', { id: '404' });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
