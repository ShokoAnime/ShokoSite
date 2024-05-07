import { useLocation } from '@remix-run/react';
import { useDownloadData } from '~/hooks/useDownloadData';
import { useDownloadsContext } from '~/context/DownloadsContext';
import { DownloadCallout, DownloadGrid, DownloadNavTabs, DownloadSingle, Loading } from '~/components';
import { mdiLightbulbAlertOutline } from '@mdi/js';
import { urlFormatProper } from '~/helpers/urlFormat';

interface DownloadsIndexProps {
  tabName: string;
}

export const DownloadsIndex = ({ tabName }: DownloadsIndexProps) => {
  const { tab, setTab, data, isLoading } = useDownloadsContext();
  const location = useLocation();

  // Format tab name for match.
  setTab(urlFormatProper(location.pathname));

  useDownloadData(tabName);

  const renderShokoServer = () => {
    if (tab === 'Shoko Server' && data !== undefined) {
      // @ts-expect-error - Types match, but TS doesn't know that data is defined.
      return <DownloadSingle data={data[0]} />;
    }
    return null;
  };

  const renderDownloadGrid = () => {
    if (tab === 'Media Player Plugins' && data !== undefined && !isLoading) {
      // @ts-expect-error - Types match, but TS doesn't know that data is defined.
      return <DownloadGrid data={data} />;
    }
    return null;
  };

  return (
    <>
      <DownloadNavTabs />
      <div className="mx-auto flex min-h-[calc(100vh-645px)] max-w-[1440px] flex-col gap-y-16 p-16 2xl:px-0 2xl:py-16">
        {isLoading
          ? <Loading />
          : (
            <>
              <DownloadCallout
                icon={mdiLightbulbAlertOutline}
                message={
                  <span>
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
              {renderShokoServer()}
              {renderDownloadGrid()}
            </>
          )}
      </div>
    </>
  );
};
