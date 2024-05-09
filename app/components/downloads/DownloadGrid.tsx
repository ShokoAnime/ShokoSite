import { mdiDownload, mdiPowerPlug } from '@mdi/js';
import { convertNameToUrl } from '~/helpers/utils';
import LinkButton from '~/components/common/LinkButton';
import { DownloadsDataType } from '~/types/DownloadsDataType';
import Icon from '~/components/common/Icon';

type DownloadProps = {
  data: DownloadsDataType[];
};

const DownloadGrid = ({ data }: DownloadProps) => {
  return (
    <div className="flex flex-wrap gap-8">
      {data.map((download) => (
        <div key={download.name} className="flex max-w-[28.5rem] flex-col gap-y-6 ">
          <img className="shadow-custom rounded-lg" src={download.images[0]} alt="" />
          <div className="flex items-center justify-between">
            <div>
              <h4>{download.name}</h4>
              <hr className="border-shoko-highlight w-[6.25rem] border" />
            </div>
            <div className="bg-shoko-bg-alt text-shoko-text-header flex gap-x-2 rounded-lg px-4 py-3 font-medium">
              <Icon icon={mdiPowerPlug} />
              {download.downloads[0].text}
            </div>
          </div>
          <div className="line-clamp-3">
            {download.description}
          </div>
          <div className="text-shoko-text-header flex justify-between font-medium opacity-65">
            <div>
              Version {''}
              {download.downloads[0].links.map((link) => (
                link.version
              ))}
            </div>
            <div>
              {download.downloads[0].links.map((link) => (
                link.date
              ))}
            </div>
          </div>
          <LinkButton buttonType="resource" className="!p-4" to={convertNameToUrl(download.name)}>
            <div className="mx-auto flex items-center gap-x-2">
              <Icon icon={mdiDownload} />
              Download {download.name}
            </div>
          </LinkButton>
        </div>
      ))}
    </div>
  );
};

export default DownloadGrid;
