import React, { useEffect, useState } from 'react';
import '~/css/tailwind.css';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import ScrollWrapper from '~/components/layout/ScrollWrapper';
import { ThemeProvider } from '~/context/ThemeContext';
import MobileMenu from './components/layout/MobileMenu';

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const htmlElement = document.documentElement;
    setTimeout(function () {
      htmlElement.classList.remove('hidden');
    }, 200);
  }, []);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <html lang="en" className={`hidden`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Shoko</title>
      </head>
      <ScrollWrapper>
        <ThemeProvider>
          <Header showMobileMenu={showMenu} onMobileMenuToggle={(val) => setShowMenu(_ => val)} />
          <div className="h-full min-h-[calc(100vh-664px)]">
            {children}
          </div>
          <ScrollRestoration />
          <Scripts />
          <Footer />
          <MobileMenu showMenu={showMenu} onClose={(val) => setShowMenu(_ => val)} />
        </ThemeProvider>
      </ScrollWrapper>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
