import { useEffect, useState } from 'react';
import { mdiAccount, mdiDownload, mdiPowerPlug } from '@mdi/js';
import cx from 'classnames';

import { convertNameToUrl } from '~/helpers/helpers';
import { DownloadGridProps } from '~/types/downloads';
import Icon from '~/components/common/Icon';
import LinkButton from '~/components/common/LinkButton';

const DownloadGrid = ({ data, type, setTagClicked, tagClicked, selectedTags }: DownloadGridProps) => {
  const [downloadData, setDownloadData] = useState(data);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (tagClicked) {
      setVisible(false);
      const timeout = setTimeout(() => {
        setVisible(true);
        setDownloadData(data);
        setTagClicked(false);
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      setVisible(true);
      setDownloadData(data);
    }
  }, [data, tagClicked]);

  if (downloadData.length === 0 && selectedTags.length !== 0) {
    return (
      <div className={cx('w-full max-w-[1086px]', visible ? 'opacity-100' : 'opacity-0')}>
        <h4>Looks like there were no Web UI Themes with your selected criteria.</h4>
      </div>
    );
  }

  return (
    <div
      className={cx(
        'text-shoko-text-header mx-auto size-full min-h-[calc(100vh-557px)] w-full',
        type === 'webui-themes' ? 'max-w-[1076px]' : 'max-w-[1440px]',
      )}
    >
      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6 lg:gap-8 justify-center lg:justify-normal container mx-auto w-full items-center lg:items-start px-4">
        {downloadData.map((download) => (
          <div
            key={download.filename}
            className={cx('flex flex-col gap-y-6', type === 'webui-themes' ? 'max-w-[32.5rem]' : 'max-w-[28.5rem]')}
          >
            <img
              className={cx('shadow-custom rounded-lg', type === 'webui-themes' ? 'lg:h-72' : 'lg:h-64')}
              src={download.frontmatter.images[0].url}
              alt={download.frontmatter.images[0].alt}
            />
            <div className="flex items-center justify-between">
              <div>
                <h4>{download.frontmatter.name}</h4>
                <hr className="border-shoko-highlight w-[6.25rem] border" />
              </div>
              {type !== 'webui-themes'
                ? (
                  <div className="bg-shoko-bg-alt border-shoko-border text-shoko-text-header flex gap-x-2 rounded-lg border px-4 py-3 font-medium">
                    <Icon icon={mdiPowerPlug} />
                    {download.frontmatter.downloads[0].text}
                  </div>
                )
                : (
                  <div className="bg-shoko-bg-alt border-shoko-border text-shoko-text-header flex gap-x-2 rounded-lg border px-4 py-3 font-medium">
                    <Icon icon={mdiAccount} />
                    {download.frontmatter.author}
                  </div>
                )}
            </div>
            <div className="line-clamp-3">
              {download.description}
            </div>
            <div className="text-shoko-text-header flex justify-between font-medium opacity-65">
              <div>
                Version {''}
                {download.frontmatter.version}
              </div>
              <div>
                {download.frontmatter.date}
              </div>
            </div>
            <LinkButton buttonType="download" className="!p-4" to={convertNameToUrl(download.frontmatter.name)}>
              <div className="mx-auto flex items-center gap-x-2">
                <Icon icon={mdiDownload} />
                Download {download.frontmatter.name}
              </div>
            </LinkButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadGrid;
