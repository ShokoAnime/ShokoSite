import { useDownloadData } from '~/hooks/useDownloadData';
import { useLocation, useParams } from '@remix-run/react';
import { mdiLightbulbAlertOutline } from '@mdi/js';
import { convertToProperName } from '~/helpers/utils';
import { DownloadsDataType } from '~/types/DownloadsDataType';
import PageBanner from '~/components/layout/PageBanner';
import PageNotFound from '~/components/layout/PageNotFound';
import DownloadSingle from '~/components/downloads/DownloadSingle';
import DownloadNavTabs from '~/components/downloads/DownloadNavTabs';
import DownloadCallout from '~/components/downloads/DownloadCallout';

function DownloadsSingle() {
  const { id } = useParams();
  const data = useDownloadData(id ?? '') ?? [];
  const path = useLocation().pathname;
  const name = path.split('/')[3];
  const file = data.filter((item: DownloadsDataType) => item.name === convertToProperName(name));

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  if (file.length === 0) {
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
        {file.length !== 0 && <DownloadSingle data={file[0]} />}
      </div>
    </>
  );
}

export default DownloadsSingle;
