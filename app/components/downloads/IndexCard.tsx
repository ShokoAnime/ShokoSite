import { mdiLayersTriple, mdiTelevision, mdiThemeLightDark, mdiTools, mdiWeatherSunset } from '@mdi/js';
import { Link } from '@remix-run/react';

import { DownloadCategories } from '~/types/downloads';
import Icon from '~/components/common/Icon';

const DownloadIndexCard = () => {
  const downloadData = [
    {
      title: 'Shoko Server',
      description: 'The main program, required for everything else to properly work. ',
      icon: mdiLayersTriple,
      link: '/downloads/shoko-server',
    },
    {
      title: 'Media Player Plugins',
      description: 'Plugins to get Shoko working with various media players programs.',
      icon: mdiTelevision,
      link: '/downloads/media-player-plugins',
    },
    {
      title: 'Web UI Themes',
      description: 'Browse our collection of user submitted themes to enhance the Web UI. ',
      icon: mdiThemeLightDark,
      link: '/downloads/webui-themes',
    },
    {
      title: 'Renamer Plugins',
      description: 'Plugins to replace Shoko’s built-in renamer functionality',
      icon: mdiTools,
      link: '/downloads/renamer-plugins',
    },
    {
      title: 'Legacy Apps',
      description: 'Deprecated apps that are listed for archival purposes only.',
      icon: mdiWeatherSunset,
      link: '/downloads/legacy',
    },
  ];

  const SingleDownload = ({ title, description, icon, link }: DownloadCategories) => {
    return (
      <Link
        key={title}
        to={link}
        className='fit-content px-8 md:px-0 md:max-w-[250px]'
      >
        <div className="bg-shoko-bg border-shoko-border border-b-shoko-link hover:bg-shoko-link hover:text-shoko-text-alt group flex w-full max-w-[28.125rem] flex-col items-center gap-x-6 gap-y-4 rounded-lg border border-b-2 p-4 transition-colors duration-500 ease-in-out">
          <Icon
            className="text-shoko-text-header group-hover:text-shoko-text-alt transition-colors duration-500 ease-in-out"
            icon={icon}
            size={50}
          />
          <div className="flex w-full flex-col gap-y-2">
            <div className="font-header text-shoko-text-header group-hover:text-shoko-text-alt flex justify-center text-xl font-semibold transition-colors duration-500 ease-in-out">
              {title}
            </div>
            <div className="font-body flex text-center text-base">
              {description}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="flex flex-col mx-auto justify-center md:flex-row md:flex-wrap gap-6">
      {downloadData.map((download) => <SingleDownload key={download.title} {...download} />)}
    </div>
  );
};

export default DownloadIndexCard;
