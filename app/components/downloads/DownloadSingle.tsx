import React, { useState } from 'react';
import { mdiBookOpenOutline, mdiClockEditOutline, mdiDownload } from '@mdi/js';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import cx from 'classnames';
import { DownloadsDataType } from '~/types/DownloadsDataType';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';

type DownloadProps = {
  data: DownloadsDataType;
};

type IconName = {
  discord: React.ReactNode;
  github: React.ReactNode;
  changelog: string;
  docs: string;
  [key: string]: React.ReactNode | string;
};

const DownloadSingle = ({ data }: DownloadProps) => {
  const [downloadTab, setDownloadTab] = useState(data.downloads[0].text);

  const iconName: IconName = {
    discord: <FaGithub size={24} />,
    github: <FaDiscord size={24} />,
    changelog: mdiClockEditOutline,
    docs: mdiBookOpenOutline,
  };

  return (
    <div className="flex items-center gap-x-16">
      <div className="flex flex-col gap-y-4">
        {data.images.map((image) => <img key={image} className="max-w-[37.5rem]" src={image} alt={data.name} />).slice(
          0,
          1,
        )}
        <div className="flex gap-x-3">
          {data.images.map((image) => <img key={image} className="h-20 max-w-[8.75rem]" src={image} alt={data.name} />)
            .slice(
              1,
            )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-6">
        <div className="border-shoko-border flex items-center justify-between gap-x-2 border-b pb-6">
          <h2 className="text-xl font-medium">Info</h2>
          <div className="flex gap-x-3">
            {data.resources.map((resource) => (
              <Button key={resource.name} className="flex gap-x-2" buttonType="resource">
                <Icon icon={iconName[resource.name.toLowerCase()]} />
                <div className="text-sm">{resource.name}</div>
              </Button>
            ))}
          </div>
        </div>
        <div className="text-shoko-text text-base">{data.description}</div>
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center gap-x-12 border-b pb-6">
            {data.downloads.map((downloadLink) => (
              <Button
                buttonType="text"
                key={downloadLink.text}
                className={cx('px-0 text-xl', downloadTab === downloadLink.text && ('!text-shoko-link'))}
                disabled={data.downloads.length === 1}
                onClick={() => setDownloadTab(downloadLink.text)}
              >
                {downloadLink.text}
              </Button>
            ))}
          </div>
          <div>
            {data.downloads.filter((downloadArray) => downloadArray.text === downloadTab)
              .map((downloadLink) => (
                <div key={downloadLink.text} className="flex flex-col gap-y-4">
                  {downloadLink.links.map((link) => (
                    <Button
                      key={link.name}
                      className="flex justify-between !py-4"
                      buttonType="resource"
                    >
                      <div className="flex gap-x-2">
                        <Icon icon={mdiDownload} />
                        <div>{link.name}</div>
                      </div>
                      <div className="flex gap-x-2">
                        <div>
                          {link.version}
                        </div>
                        {link.date && <div>|</div>}
                        <div>{link.date}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSingle;
