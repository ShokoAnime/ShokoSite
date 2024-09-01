import {
  mdiLayersTriple,
  mdiTelevision,
  mdiThemeLightDark,
  mdiTools,
  mdiWeatherSunset,
} from "@mdi/js";
import { Link } from "@remix-run/react";

import { DownloadCategories } from "~/types/downloads";
import Icon from "~/components/common/Icon";

const DownloadIndexCard = () => {
  const downloadData = [
    {
      title: "Shoko Server",
      description:
        "The main program, required for everything else to properly work. ",
      icon: mdiLayersTriple,
      link: "/downloads/shoko-server",
    },
    {
      title: "Media Player Plugins",
      description:
        "Plugins to get Shoko working with various media players programs.",
      icon: mdiTelevision,
      link: "/downloads/media-player-plugins",
    },
    {
      title: "Web UI Themes",
      description:
        "Browse our collection of user submitted themes to enhance the Web UI. ",
      icon: mdiThemeLightDark,
      link: "/downloads/webui-themes",
    },
    {
      title: "Renamer Plugins",
      description: "Plugins to replace Shoko’s built-in renamer functionality",
      icon: mdiTools,
      link: "/downloads/renamer-plugins",
    },
    {
      title: "Legacy Apps",
      description:
        "Deprecated apps that are listed for archival purposes only.",
      icon: mdiWeatherSunset,
      link: "/downloads/legacy",
    },
  ];

  const SingleDownload = ({
    title,
    description,
    icon,
    link,
  }: DownloadCategories) => {
    return (
      <Link key={title} to={link}>
        <div className="group flex w-full max-w-[28.125rem] flex-col items-center gap-x-6 gap-y-4 rounded-lg border border-b-2 border-shoko-border border-b-shoko-link bg-shoko-bg p-4 transition-colors duration-500 ease-in-out hover:bg-shoko-link hover:text-shoko-text-alt">
          <Icon
            className="text-shoko-text-header transition-colors duration-500 ease-in-out group-hover:text-shoko-text-alt"
            icon={icon}
            size={100}
          />
          <div className="flex w-full max-w-[228px] flex-col gap-y-2">
            <div className="flex justify-center font-header text-xl font-semibold text-shoko-text-header transition-colors duration-500 ease-in-out group-hover:text-shoko-text-alt">
              {title}
            </div>
            <div className="flex text-center font-body text-base">
              {description}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {downloadData.map((download) => (
        <SingleDownload key={download.title} {...download} />
      ))}
    </div>
  );
};

export default DownloadIndexCard;
