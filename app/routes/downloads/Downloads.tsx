import { Navigate, useParams } from '@remix-run/react';
import { mdiLightbulbAlertOutline } from '@mdi/js';
import { DownloadsDataType } from '~/types/DownloadsDataType';
import PageNotFound from '~/components/layout/PageNotFound';
import PageBanner from '~/components/layout/PageBanner';
import DownloadNavTabs from '~/components/downloads/DownloadNavTabs';
import DownloadCallout from '~/components/downloads/DownloadCallout';
import DownloadItem from '~/components/downloads/DownloadItem';
import DownloadGrid from '~/components/downloads/DownloadGrid';
import { downloadsCheck } from '~/helpers/downloads-check';

function Downloads() {
  const validPaths = ['shoko-server', 'media-player-plugins', 'web-ui-themes', 'renamer-plugins', 'legacy'];
  const { id } = useParams();

  const data: DownloadsDataType[] = downloadsCheck(id ?? '') ?? [];

  if (!id) {
    return <Navigate to="/downloads/shoko-server" replace />;
  }

  if (!validPaths.includes(id)) {
    return <PageNotFound />;
  }

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
        {data.length === 1 ? <DownloadItem data={data[0]} /> : <DownloadGrid data={data} />}
      </div>
    </>
  );
}

export default Downloads;
