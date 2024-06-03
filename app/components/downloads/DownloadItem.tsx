import React, { useState } from 'react';
import { mdiBookOpenOutline, mdiClockEditOutline, mdiDownload } from '@mdi/js';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import cx from 'classnames';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';
import { DownloadSingleProps } from '~/types/DownloadTypes';
import Image from '~/components/common/Image';

type DownloadProps = {
  data: DownloadSingleProps;
};

type IconName = {
  [key: string]: React.ReactNode | string;
  discord: React.ReactNode;
  github: React.ReactNode;
  changelog: string;
  docs: string;
};

const DownloadItem = ({ data }: DownloadProps) => {
  const [downloadTab, setDownloadTab] = useState(data.frontmatter.downloads[0].text);

  const iconName: IconName = {
    discord: <FaGithub size={24} />,
    github: <FaDiscord size={24} />,
    changelog: mdiClockEditOutline,
    docs: mdiBookOpenOutline,
  };

  return (
    <div className="flex items-center gap-x-16">
      <div className="flex flex-col gap-y-4">
        {data.frontmatter.images.map((image) => (
          <Image
            src={image.url}
            alt={image.alt}
            className="size-full max-h-[21rem] max-w-[37.5rem] rounded-lg"
            key={image.alt}
          />
        )).slice(0, 1)}
        {data.frontmatter.images.length > 1 && (
          <div className="flex gap-x-3">
            {data.frontmatter.images.map((image) => (
              <Image
                src={image.url}
                alt={image.alt}
                className="h-20 w-fit max-w-[8.75rem] rounded-lg"
                key={image.alt}
              />
            )).slice(1)}
          </div>
        )}
      </div>
      <div className="flex w-full flex-col gap-y-6">
        <div className="border-shoko-border flex items-center justify-between gap-x-2 border-b pb-6">
          <h2 className="text-xl font-medium">Info</h2>
          <div className="flex gap-x-3">
            {data.frontmatter.resources.map((resource) => (
              <a key={resource.name} className="text-sm" href={resource.url} target="_blank" rel="noreferrer">
                <Button className="flex gap-x-2" buttonType="resource">
                  <Icon icon={iconName[resource.name.toLowerCase()]} />
                  {resource.name}
                </Button>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-6" id="markdown">{data.description}</div>
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center gap-x-12 border-b pb-6">
            {data.frontmatter.downloads.map((downloadLink) => (
              <Button
                buttonType="text"
                key={downloadLink.text}
                className={cx('px-0 text-xl', downloadTab === downloadLink.text && ('!text-shoko-link'))}
                disabled={data.frontmatter.downloads.length === 1}
                onClick={() => setDownloadTab(downloadLink.text)}
              >
                {downloadLink.text}
              </Button>
            ))}
          </div>
          <div>
            {data.frontmatter.downloads.filter((downloadArray) => downloadArray.text === downloadTab)
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

export default DownloadItem;
