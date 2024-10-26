import { LoaderFunction } from '@remix-run/cloudflare';
import { Resvg, initWasm } from '@resvg/resvg-wasm';
import satori from 'satori';
import wasmData from '~/lib/index_bg.wasm?url';

let wasmInitialized = false;

export const loader: LoaderFunction = async ({ request }) => {
  if (!wasmInitialized) {
    const { default: resvgwasm } = await import(
      /* @vite-ignore */ `${wasmData}?module`
    );
    await initWasm(resvgwasm);
    wasmInitialized = true;
  }

  const url = new URL(request.url);
  const title = url.searchParams.get('title') || 'Default Title';
  const summary = url.searchParams.get('summary') || 'Default Summary';
  const date = url.searchParams.get('date') || '';
  const version = url.searchParams.get('version') || '';
  const pageUrl = url.searchParams.get('pageUrl') || 'https://shokoanime.com';
  const backgroundImage = url.searchParams.get('backgroundImage')
    || 'https://shokoanime.com/images/banners/main-banner.jpg';

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

  return new Response(pngBuffer, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' },
  });
};
