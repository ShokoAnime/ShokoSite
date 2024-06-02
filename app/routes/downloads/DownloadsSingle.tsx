import { useLocation } from '@remix-run/react';
import { mdiLightbulbAlertOutline } from '@mdi/js';
import PageBanner from '~/components/layout/PageBanner';
import PageNotFound from '~/components/layout/PageNotFound';
import DownloadItem from '~/components/downloads/DownloadItem';
import DownloadNavTabs from '~/components/downloads/DownloadNavTabs';
import DownloadCallout from '~/components/downloads/DownloadCallout';
import { markdownDetail } from '~/helpers/markdown-detail';

function DownloadsSingle() {
  const path = useLocation().pathname;
  const downloadName = path.split('/').pop();
  const data = markdownDetail(path);

  if (data === undefined) {
    return <PageNotFound />;
  }

  return (
    <>
      <PageBanner title={downloadName ?? 'Downloads'} />
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
        {<DownloadItem data={data} />}
      </div>
    </>
  );
}

export default DownloadsSingle;
