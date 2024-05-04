import { DownloadCallout, DownloadCard, DownloadSingle } from '~/components';
import { DownloadGridProps, DownloadProps } from '~/components/downloads/downloads.interfaces';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { useDownloadsContext } from '~/context/DownloadsContext';

interface DownloadIndexProps {
  data?: DownloadProps[] | string[] | [];
  tab: string;
}

export const DownloadIndex = ({ data, tab }: DownloadIndexProps) => {
  const { isLoading, setIsLoading } = useDownloadsContext();
  const downloadData = data as DownloadGridProps[];

  if (!downloadData || downloadData.length === 0) {
    return <div>No data available.</div>;
  }

  const renderShokoServer = () => {
    if (tab === 'Shoko Server') {
      return <DownloadSingle data={downloadData[0]} />;
    }
    return null;
  };

  const renderMediaPlayerPlugins = () => {
    if (tab === 'Media Player Plugins') {
      return (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-16">
          {downloadData.map((mediaPlayer: DownloadGridProps) => (
            <DownloadCard
              key={mediaPlayer.name}
              image={mediaPlayer.images[0]}
              name={mediaPlayer.name}
              description={mediaPlayer.description}
              mediaPlayer={mediaPlayer.downloads[0].text}
              date={mediaPlayer.downloads[0].links[0].date}
              version={mediaPlayer.downloads[0].links[0].version}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <DownloadCallout
        icon={faLightbulb}
        message={
          <span>
            Learn how to make your own Shoko application / plugin using our extensive API.{' '}
            <a
              className="font-medium text-link-light underline dark:text-link-dark"
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
      {renderMediaPlayerPlugins()}
    </>
  );
};
