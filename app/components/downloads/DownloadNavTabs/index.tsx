import React from 'react';
import { Button } from '~/components';
import { useDownloadsContext } from '~/context/DownloadsContext';
import { useNavigate } from '@remix-run/react';

export const DownloadNavTabs = () => {
  const { tab, setTab, setIsLoading } = useDownloadsContext();
  const navigate = useNavigate();
  const navigationTabs = ['Shoko Server', 'Media Player Plugins', 'Web UI Themes', 'Renamer Plugins', 'Legacy'];

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    const tabName = target.innerText.replace(/ /g, '-').toLowerCase();
    setIsLoading(true);
    setTab(target.innerText);
    navigate(`/downloads/${tabName}`);
  };

  return (
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
  );
};
