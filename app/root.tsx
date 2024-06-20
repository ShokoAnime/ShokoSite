import React, { useEffect } from 'react';
import '~/css/tailwind.css';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import ScrollWrapper from '~/components/layout/ScrollWrapper';
import { ThemeProvider } from '~/context/ThemeContext';

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const htmlElement = document.documentElement;
    setTimeout(function() {
      htmlElement.classList.remove('hidden');
    }, 200);
  }, []);

  return (
    <html lang="en" className={`hidden`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Shoko</title>
      </head>
      <body>
        {/*<ScrollWrapper>*/}
        <ThemeProvider>
          <Header />
          {children}
          <ScrollRestoration />
          <Scripts />
          <Footer />
        </ThemeProvider>
        {/*</ScrollWrapper>*/}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
