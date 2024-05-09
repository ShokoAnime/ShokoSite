import { LoaderFunction, redirect } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { mdiLightbulbAlertOutline } from '@mdi/js';
import PageBanner from '~/components/layout/PageBanner';
import DownloadNavTabs from '~/components/downloads/DownloadNavTabs';
import DownloadCallout from '~/components/downloads/DownloadCallout';

export const validPaths = ['shoko-server', 'media-player-plugins', 'web-ui-themes', 'renamer-plugins', 'legacy'];

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  if (!id) {
    return redirect('/downloads/shoko-server', { status: 301 });
  }

  if (!validPaths.includes(id)) {
    throw new Response('Not Found', { status: 404 });
  }

  return null;
};

function Downloads() {
  return (
    <>
      <PageBanner
        title="Downloads"
        description="Browse through our complete selection of programs, plugins, Web UI Themes and other tools available in the Shoko Suite."
      />
      <DownloadNavTabs />
      <div className="mx-auto flex min-h-[calc(100vh-645px)] max-w-[1440px] flex-col gap-y-16 p-16 2xl:px-0 2xl:py-16">
        <DownloadCallout
          icon={mdiLightbulbAlertOutline}
          message={
            <span className="text-shoko-text text-base">
              Learn how to make your own Shoko application / plugin using our extensive API.{' '}
              <a
                className="text-shoko-link font-medium"
                href="/"
                target="_blank"
                rel="noopener"
              >
                Click Here to learn more!
              </a>
            </span>
          }
        />
        <Outlet />
      </div>
    </>
  );
}

export default Downloads;
