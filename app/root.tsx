import React, { Suspense } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import { Providers } from '~/context/Providers';
import { ScrollWrapper } from '~/components';
import '~/css/tailwind.css';

type LoaderData = {
  theme: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeHeader = request.headers.get('Cookie');
  const theme = themeHeader?.includes('theme=dark') ? 'dark' : 'light';
  return json<LoaderData>({ theme });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useLoaderData<LoaderData>();
  return (
    <html lang="en" className={theme}>
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
            {children}
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
