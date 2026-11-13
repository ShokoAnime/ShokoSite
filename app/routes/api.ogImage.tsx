import { LoaderFunction } from 'react-router';
import { Resvg, initWasm } from '@resvg/resvg-wasm';
import satori from 'satori';
import wasmData from '~/lib/index_bg.wasm?url';

let wasmInitialized = false;

const siteOrigin = 'https://shokoanime.com';
const defaultBackground = `${siteOrigin}/images/banners/main-banner.jpg`;

/** Cap on each text parameter, so a crafted URL can't force huge renders. */
const maxLength = { title: 120, summary: 320, date: 32, version: 32 } as const;

/** Only allow URLs on our own origin; anything else falls back to `fallback`. */
function siteUrl(value: string | null, fallback: string): string {
  try {
    const parsed = new URL(value ?? '');
    return parsed.origin === siteOrigin ? parsed.href : fallback;
  } catch {
    return fallback;
  }
}

function param(url: URL, name: keyof typeof maxLength, fallback = ''): string {
  return (url.searchParams.get(name) || fallback).slice(0, maxLength[name]);
}

/** The Workers edge cache; `undefined` in the Node dev server. */
function edgeCache(): Cache | undefined {
  return typeof caches === 'undefined' ? undefined : (caches as unknown as { default: Cache }).default;
}

export const loader: LoaderFunction = async ({ url }) => {
  // Pages Function responses are not edge-cached by default, so repeat
  // requests for the same card would otherwise be rendered again each time.
  const cache = edgeCache();
  const cacheKey = new Request(url.href);
  const cached = await cache?.match(cacheKey);
  // Copy it: a response read from the cache has immutable headers.
  if (cached) return new Response(cached.body, cached);

  if (!wasmInitialized) {
    const { default: resvgwasm } = await import(
      /* @vite-ignore */ `${wasmData}?module`
    );
    await initWasm(resvgwasm);
    wasmInitialized = true;
  }

  const title = param(url, 'title', 'Default Title');
  const summary = param(url, 'summary', 'Default Summary');
  const date = param(url, 'date');
  const version = param(url, 'version');
  const pageUrl = siteUrl(url.searchParams.get('pageUrl'), siteOrigin);
  const backgroundImage = siteUrl(url.searchParams.get('backgroundImage'), defaultBackground);

  const siteIcon = 'https://shokoanime.com/images/common/shoko-icon.png';

  // Use Promise.all to fetch fonts in parallel
  const [figtree, spaceGrotesk] = await Promise.all([
    fetch('https://shokoanime.com/fonts/Figtree-Medium.ttf').then((res) => res.arrayBuffer()),
    fetch('https://shokoanime.com/fonts/SpaceGrotesk-Bold.ttf').then((res) => res.arrayBuffer()),
  ]);

  const svg = await satori(
    <div
      style={{
        position: 'relative',
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <img
        src={backgroundImage}
        alt={title}
        style={{
          position: 'absolute',
          width: 1200,
          height: 630,
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(23, 24, 31, 0.9)',
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'relative',
          padding: 50,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          color: 'rgba(203, 213, 225, 1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <img src={siteIcon} alt="Site Icon" style={{ width: 117, height: 100 }} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
            <div style={{ display: 'flex', fontSize: 42, fontFamily: 'Space Grotesk' }}>Shoko</div>
            <div style={{ display: 'flex', fontSize: 24, fontFamily: 'Figtree' }}>Anime Management System</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {version && (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div
                  style={{
                    display: 'flex',
                    fontSize: 20,
                    fontFamily: 'Space Grotesk',
                    color: 'rgba(203, 213, 225, .75)',
                    marginRight: '8px',
                  }}
                >
                  Ver. {version}
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: 20,
                    fontFamily: 'Space Grotesk',
                    color: 'rgba(203, 213, 225, .75)',
                    marginRight: '8px',
                  }}
                >
                  |
                </div>
              </div>
            )}
            {date && (
              <div
                style={{
                  display: 'flex',
                  fontSize: 20,
                  fontFamily: 'Space Grotesk',
                  color: 'rgba(203, 213, 225, .75)',
                }}
              >
                {date}
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 48,
              fontWeight: 'bold',
              fontFamily: 'Space Grotesk',
              marginBottom: 20,
            }}
          >
            {title}
          </div>
          <div style={{ display: 'flex', fontSize: 24, fontFamily: 'Figtree' }}>{summary}</div>
          <div
            style={{
              display: 'flex',
              fontSize: 14,
              marginTop: 20,
              fontFamily: 'Figtree',
              color: 'rgba(203, 213, 225, .75)',
            }}
          >
            {pageUrl}
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Figtree', data: figtree, style: 'normal', weight: 500 },
        { name: 'Space Grotesk', data: spaceGrotesk, style: 'normal', weight: 600 },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const response = new Response(pngBuffer as BodyInit, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400, s-maxage=604800' },
  });
  await cache?.put(cacheKey, response.clone());
  return response;
};
