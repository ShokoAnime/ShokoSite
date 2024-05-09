import React from 'react';
import LinkButton from '~/components/common/LinkButton';
import { useLocation } from '@remix-run/react';
import { convertNameToUrl } from '~/helpers/utils';

const navigationTabs = ['Shoko Server', 'Media Player Plugins', 'Web UI Themes', 'Renamer Plugins', 'Legacy'];

const DownloadNavTabs = () => {
  const path = useLocation().pathname;

  return (
    <div className="bg-shoko-bg-alt h-[5.5rem] p-4">
      <div className="text-shoko-text-header mx-auto flex h-full max-w-[1440px] items-center justify-center gap-x-2 text-xl font-medium">
        {navigationTabs.map((tab) => {
          const link = `/downloads/${convertNameToUrl(tab)}`;
          return (
            <LinkButton
              key={tab}
              buttonType={path.startsWith(link) ? 'primary' : 'padded'}
              to={link}
            >
              {tab}
            </LinkButton>
          );
        })}
      </div>
    </div>
  );
};

export default DownloadNavTabs;
