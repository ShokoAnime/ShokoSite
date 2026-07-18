import { flatRoutes } from "@remix-run/fs-routes";
import {
  type RouteConfig,
  route,
  layout,
  index,
} from "@remix-run/route-config";

export default [
  ...(await flatRoutes({ rootDirectory: 'routes'})),
  route('/about', 'routes/about/about.tsx'),
  route('/blog', 'routes/blog/blog.tsx'),
  route('/blog/:id', 'routes/blog/blogPost.tsx'),
  route('/contributors', 'routes/contributors/contributors.tsx'),
  route('/downloads', 'routes/downloads/downloads.tsx'),
  route('/downloads/:id', 'routes/downloads/downloadsGrid.tsx'),
  route('/downloads/:id/:subid', 'routes/downloads/downloadSingle.tsx'),
  route('/downloads/shoko-server', 'routes/downloads/downloadSingle.tsx', { id: 'shoko-server' }),
  route('*', 'routes/404.tsx', { id: '404' }),
] satisfies RouteConfig;
