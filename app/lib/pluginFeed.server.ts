import matter from 'gray-matter';

import communityFeed from '~/content/plugin-feeds/community.yaml?raw';
import coreFeed from '~/content/plugin-feeds/core.yaml?raw';

/**
 * The plugin feeds, by the name they are served under
 * (`/<name>-plugin-manifest.json`), each a YAML list of plugin manifest URLs.
 */
const feeds: Record<string, string> = {
  core: coreFeed,
  community: communityFeed,
};

/** How long a built feed is served before the manifests are fetched again. */
const freshSeconds = 300;

/** How long a manifest's last good copy is kept, for when it cannot be fetched. */
const lastGoodSeconds = 7 * 24 * 60 * 60;

/** How long to wait for one manifest. */
const fetchTimeoutMs = 10_000;

type PackageManifest = Record<string, unknown> & { id: string };

/**
 * The edge cache on Cloudflare; `undefined` in the Node dev server, which
 * then builds the feed on every request.
 */
function edgeCache(): Cache | undefined {
  return typeof caches === 'undefined' ? undefined : (caches as unknown as { default: Cache }).default;
}

function cacheKey(...parts: string[]): Request {
  return new Request(`https://plugin-feed.cache/${parts.map(encodeURIComponent).join('/')}`);
}


/**
 * Reads a feed's manifest URLs from its YAML list.
 */
function readFeedUrls(name: string): string[] {
  const { data } = matter(`---\n${feeds[name]}\n---\n`);
  const plugins: unknown = data.plugins ?? [];
  if (!Array.isArray(plugins) || plugins.some(url => typeof url !== 'string' || !url.startsWith('https://'))) {
    throw new Error(`The ${name} plugin feed must be a list of https manifest URLs.`);
  }

  return plugins as string[];
}

/**
 * Takes the packages out of a fetched manifest: one package, or a list of
 * them. Reference entries pointing at other manifests are dropped, as the
 * feed serves every package inlined.
 */
function readPackages(manifest: unknown): PackageManifest[] {
  const entries = Array.isArray(manifest) ? manifest : [manifest];
  return entries.filter((entry): entry is PackageManifest =>
    typeof entry === 'object' && entry !== null
    && typeof (entry as PackageManifest).id === 'string'
    && (entry as PackageManifest).type !== 'manifest'
    && typeof (entry as PackageManifest).name === 'string'
    && Array.isArray((entry as PackageManifest).releases)
  );
}

/**
 * Fetches one manifest's packages, keeping a last good copy in the edge
 * cache and falling back to it when the manifest cannot be fetched or read.
 */
async function fetchPackages(feed: string, url: string, cache: Cache | undefined): Promise<PackageManifest[]> {
  const key = cacheKey(feed, 'source', url);
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(fetchTimeoutMs), headers: { accept: 'application/json' } });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const packages = readPackages(await response.json());
    if (packages.length === 0) {
      throw new Error('no packages');
    }

    await cache?.put(key, new Response(JSON.stringify(packages), { headers: { 'cache-control': `max-age=${lastGoodSeconds}` } }));
    return packages;
  } catch (error) {
    const lastGood = await cache?.match(key);
    console.warn(`Plugin feed ${feed}: could not fetch ${url} (${error}); ${lastGood ? 'serving its last good copy' : 'leaving it out'}.`);
    return lastGood ? (await lastGood.json()) as PackageManifest[] : [];
  }
}

async function etagOf(body: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body));
  return `"${[...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('')}"`;
}

function answer(body: string, etag: string, request: Request): Response {
  const headers = {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': `public, max-age=${freshSeconds}`,
    etag,
  };
  return request.headers.get('if-none-match') === etag
    ? new Response(null, { status: 304, headers })
    : new Response(body, { headers });
}

/**
 * Serves a plugin feed: every package of every manifest it lists, in its
 * order, with the built feed kept in the edge cache for a few minutes.
 */
export async function servePluginFeed(name: string, request: Request): Promise<Response> {
  if (!(name in feeds)) {
    return new Response('Not Found', { status: 404 });
  }

  const cache = edgeCache();
  const freshKey = cacheKey(name, 'feed');
  const cached = await cache?.match(freshKey);
  if (cached) {
    return answer(await cached.text(), cached.headers.get('etag') ?? '', request);
  }

  const urls = readFeedUrls(name);
  const packages = (await Promise.all(urls.map(url => fetchPackages(name, url, cache)))).flat();
  const body = JSON.stringify(packages, null, 2);
  const etag = await etagOf(body);
  await cache?.put(freshKey, new Response(body, { headers: { 'cache-control': `max-age=${freshSeconds}`, etag } }));
  return answer(body, etag, request);
}
