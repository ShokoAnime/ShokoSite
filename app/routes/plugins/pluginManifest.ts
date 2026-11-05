import { servePluginFeed } from '~/lib/pluginFeed.server';
import type { Route } from './+types/pluginManifest';

/**
 * A plugin feed, `/<name>-plugin-manifest.json`, with every package inlined:
 * the server reads it as a package repository.
 */
export async function loader({ request, url }: Route.LoaderArgs) {
  const name = url.pathname.replace(/^\//, '').replace(/-plugin-manifest\.json$/, '');
  return servePluginFeed(name, request);
}
