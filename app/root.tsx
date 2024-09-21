import React from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import './css/tailwind.css';
import PageWrapper from '~/components/layout/PageWrapper';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Shoko</title>
      </head>
      <body>
        <PageWrapper>
          {children}
          <ScrollRestoration />
          <Scripts />
        </PageWrapper>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
