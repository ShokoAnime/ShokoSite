import React from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import { Providers } from '~/context/Providers';
import '~/css/tailwind.css';
import PageNotFound from '~/components/layout/PageNotFound';
import ScrollWrapper from '~/components/layout/ScrollWrapper';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';

type LoaderData = {
  theme: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeHeader = request.headers.get('Cookie');
  const theme = themeHeader?.includes('theme=dark') ? 'dark' : 'light';
  return json<LoaderData>({ theme });
};

export function ErrorBoundary() {
  const error = useRouteError();

  console.log(error);

  if (isRouteErrorResponse(error)) {
    return <PageNotFound />;
  }

  return <div>An error occurred</div>;
}

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
