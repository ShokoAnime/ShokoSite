import { LoaderFunction, redirect } from '@remix-run/node';
import { Footer, Header, PageNotFound } from '~/components';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  if (url.pathname === '/downloads' || url.pathname === '/downloads/') {
    return redirect(`/downloads/shoko-server`, { status: 301 });
  }

  return null;
};

export default function Downloads() {
  return (
    <>
      <Header />
      <PageNotFound />
      <Footer altBackground={true} />
    </>
  );
}
