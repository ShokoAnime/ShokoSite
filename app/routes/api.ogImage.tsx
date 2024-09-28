// app/routes/api/ogImage.tsx

import { LoaderFunction } from '@remix-run/cloudflare';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  // Extract query parameters
  const title = url.searchParams.get('title') || 'Default Title';
  const summary = url.searchParams.get('summary') || 'Default Summary';
  const date = url.searchParams.get('date') || '';
  const pageUrl = url.searchParams.get('url') || 'https://shokoanime.com';
  const backgroundImage = url.searchParams.get('background')
    || 'https://shokoanime.com/assets/images/banners/Banner-1.jpg';

  // Define assets
  const siteIcon = 'https://shokoanime.com/icon.png'; // Replace with your icon URL

  // Fetch the font data
  const figtree = await fetch('https://shokoanime.com/fonts/Figtree-Medium.ttf').then((res) => res.arrayBuffer());
  const spaceGrotesk = await fetch('https://shokoanime.com/fonts/SpaceGrotesk-Bold.ttf').then((res) =>
    res.arrayBuffer()
  );

  // Create the SVG using Satori
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
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Background"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(23, 24, 31, 0.9)', // Semi-transparent black overlay
        }}
      />

      {/* Content */}
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
        {/* Top Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={siteIcon} alt="Site Icon" style={{ width: 100, height: 100 }} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
            <div style={{ fontSize: 42, fontFamily: 'Space Grotesk' }}>Shoko</div>
            <div style={{ fontSize: 24, fontFamily: 'Figtree' }}>Anime Management System</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {date && (
            <div style={{ fontSize: 20, fontFamily: 'Space Grotesk', color: 'rgba(203, 213, 225, .75)' }}>{date}</div>
          )}
          <div style={{ fontSize: 48, fontWeight: 'bold', fontFamily: 'Space Grotesk', marginBottom: 20 }}>{title}</div>
          <div style={{ fontSize: 24, fontFamily: 'Figtree' }}>{summary}</div>
          <div style={{ fontSize: 14, marginTop: 20, fontFamily: 'Figtree', color: 'rgba(203, 213, 225, .75)' }}>
            {pageUrl}
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Figtree',
          data: figtree,
          style: 'normal',
          weight: 500,
        },
        {
          name: 'Space Grotesk',
          data: spaceGrotesk,
          style: 'normal',
          weight: 600,
        },
      ],
    },
  );

  // Convert SVG to PNG using Resvg
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
