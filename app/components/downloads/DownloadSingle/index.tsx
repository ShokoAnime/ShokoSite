import { useState } from 'react';
import { Button } from '~/components';
import { DownloadProps } from '~/components/downloads/downloads.interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookSkull, faClockRotateLeft, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

export const DownloadSingle = ({ data }: DownloadProps) => {
  const [downloadTab, setDownloadTab] = useState(data?.downloads[0]?.text ?? 'Link');

  const iconName = {
    discord: faDiscord,
    github: faGithub,
    changelog: faClockRotateLeft,
    docs: faBookSkull,
  };

  return (
    <section key={data?.name} className="flex items-center gap-x-16">
      <div className="flex flex-col gap-y-4">
        {data?.images
          .map((image) => <img key={image} className="max-w-[37.5rem]" src={image} alt="Alt" />)
          .slice(0, 1)}
        <div className="flex gap-x-3">
          {data?.images.map((image) => (
            <img
              key={image}
              className="h-20 max-w-[8.75rem]"
              src={image}
              alt="Alt"
            />
          )).slice(1)}
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-6">
        <div className="flex items-center justify-between border-b border-border-light pb-6 dark:border-border-dark">
          <h2 className="text-xl font-medium text-textHeader-light dark:text-textHeader-dark">Info</h2>
          <div className="flex gap-x-3">
            {data?.resources.map((resource) => (
              <Button key={resource.name} className="flex gap-x-2" buttonType="resource">
                <FontAwesomeIcon icon={iconName[resource.name.toLowerCase() as keyof typeof iconName]} size="lg" />
                <div className="text-sm">{resource.name}</div>
              </Button>
            ))}
          </div>
        </div>
        <p>
          {data?.description}
        </p>
        <div className="flex flex-col gap-y-6">
          <nav className="flex w-full items-center gap-x-12 border-b border-border-light pb-6 dark:border-border-dark">
            {data?.downloads.map((downloadLink) => (
              <Button
                buttonType="text"
                key={downloadLink.text}
                className={`px-0 text-xl ${
                  downloadTab === downloadLink.text ? '!dark:text-link-dark !text-link-light' : ''
                }`}
                onClick={() => setDownloadTab(downloadLink.text)}
              >
                {downloadLink.text}
              </Button>
            ))}
          </nav>
          <div>
            {data?.downloads.filter((downloadArray) => downloadArray.text === downloadTab)
              .map((downloadLink) => (
                <div key={downloadLink.text} className="flex flex-col gap-y-4">
                  {downloadLink.links.map((link) => (
                    <Button
                      key={link.name}
                      className="flex w-full items-center justify-between gap-x-2 p-4"
                      buttonType="resource"
                    >
                      <div className="flex gap-x-2">
                        <FontAwesomeIcon icon={faDownload} size="lg" />
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
    </section>
  );
};
