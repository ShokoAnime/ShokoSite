import { isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';
import { DownloadsIndex, Footer, Header, PageBanner, PageNotFound } from '~/components';

interface loaderProps {
  params: {
    id: string;
  };
  item: {
    id: string;
  };
}

const validPaths = ['shoko-server', 'media-player-plugins', 'web-ui-themes', 'renamer-plugins', 'legacy'];

export const loader = async ({ params }: loaderProps) => {
  const { id } = params;

  if (!validPaths.includes(id)) {
    throw new Response('Not Found', { status: 404 });
  }

  // Return the item data for valid paths
  return { item: { id } };
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <Header />
        <PageNotFound />
        <Footer altBackground={true} />
      </>
    );
  }
}

export default function DownloadPage() {
  const { item }: loaderProps = useLoaderData();

  return (
    <div>
      <Header />
      <PageBanner
        title="Downloads"
        description="Browse through our complete selection of programs, plugins, Web UI Themes and other tools available in the Shoko Suite."
      />
      <DownloadsIndex tabName={item.id} />
      <Footer altBackground={true} />
    </div>
  );
}
