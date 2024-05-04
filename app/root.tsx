import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import { Providers } from '~/context/Providers';
import { Layout } from '~/components/layout/Wrapper';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './root.css';

type LoaderData = {
  theme: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeHeader = request.headers.get('Cookie');
  const theme = themeHeader?.includes('theme=dark') ? 'dark' : 'light';
  return json<LoaderData>({ theme });
};

export default function App() {
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
        <Layout>
          <Providers>
            <Outlet />
          </Providers>
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
