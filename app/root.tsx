import React, { useEffect } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from '@remix-run/react';
import { Providers } from '~/context/Providers';
import '~/css/tailwind.css';
import PageNotFound from '~/components/layout/PageNotFound';
import ScrollWrapper from '~/components/layout/ScrollWrapper';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import Cookies from 'js-cookie';

type ThemeData = {
  theme: string;
};

export function getThemeData(): ThemeData {
  const theme = Cookies.get('theme') === 'dark' ? 'dark' : 'light';
  return { theme };
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.log(error);

  if (isRouteErrorResponse(error)) {
    return <PageNotFound />;
  }

  return <div>An error occurred</div>;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = getThemeData();

  useEffect(() => {
    const htmlElement = document.documentElement;
    setTimeout(function() {
      htmlElement.classList.remove('hidden');
    }, 200);
  }, []);

  return (
    <html lang="en" className={`hidden ${theme}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Shoko</title>
      </head>
      <body>
        <ScrollWrapper>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </ScrollWrapper>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
