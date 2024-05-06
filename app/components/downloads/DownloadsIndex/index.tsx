import React from 'react';
import { useNavigate } from '@remix-run/react';
import { useDownloadData } from '~/hooks/useDownloadData';
import { useDownloadsContext } from '~/context/DownloadsContext';
import { Button, DownloadCallout, DownloadSingle, Loading } from '~/components';
import { mdiLightbulbAlertOutline } from '@mdi/js';

interface DownloadsIndexProps {
  tabName: string;
}

export const DownloadsIndex = ({ tabName }: DownloadsIndexProps) => {
  const navigationTabs = ['Shoko Server', 'Media Player Plugins', 'Web UI Themes', 'Renamer Plugins', 'Legacy'];
  const { tab, setTab, data, isLoading, setIsLoading } = useDownloadsContext();
  const navigate = useNavigate();

  useDownloadData(tabName);

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    const tabName = target.innerText.replace(/ /g, '-').toLowerCase();
    setIsLoading(true);
    setTab(target.innerText);
    navigate(`/downloads/${tabName}`);
  };

  const renderShokoServer = () => {
    if (tab === 'Shoko Server' && data !== undefined) {
      // @ts-expect-error - Types match, but TS doesn't know that data is defined.
      return <DownloadSingle data={data[0]} />;
    }
    return null;
  };

  return (
    <>
      <div className="bg-shoko-bg-alt h-[5.5rem] p-4">
        <div className="text-shoko-text-header mx-auto flex h-full max-w-[1440px] items-center justify-center gap-x-2 text-xl font-medium">
          {navigationTabs.map((tabName) => (
            <Button
              key={tabName}
              buttonType={tab === tabName ? 'primary' : 'padded'}
              onClick={handleTabClick}
            >
              {tabName}
            </Button>
          ))}
        </div>
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-557px)] max-w-[1440px] flex-col gap-y-16 p-16 2xl:px-0 2xl:py-16">
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
            </>
          )}
      </div>
    </>
  );
};
