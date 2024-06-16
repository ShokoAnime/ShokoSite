import Icon from '~/components/common/Icon';
import { mdiDownload, mdiPowerPlug } from '@mdi/js';
import LinkButton from '~/components/common/LinkButton';
import { convertNameToUrl } from '~/helpers/helpers';
import { MarkdownFile } from '~/types/markdown';

type DownloadGridItemsProps = {
  data: MarkdownFile[];
};

export const DownloadGridItems = ({ data }: DownloadGridItemsProps) => {
  return (
    <div className="flex flex-wrap gap-8">
      {data.map((download) => (
        <div key={download.frontmatter.name} className="flex max-w-[28.5rem] flex-col gap-y-6 ">
          <img
            className="shadow-custom h-64 rounded-lg "
            src={download.frontmatter.images[0].url}
            alt={download.frontmatter.images[0].alt}
          />
          <div className="flex items-center justify-between">
            <div>
              <h4>{download.frontmatter.name}</h4>
              <hr className="border-shoko-highlight w-[6.25rem] border" />
            </div>
            <div className="bg-shoko-bg-alt border-shoko-border text-shoko-text-header flex gap-x-2 rounded-lg border px-4 py-3 font-medium">
              <Icon icon={mdiPowerPlug} />
              {download.frontmatter.downloads[0].text}
            </div>
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
  );
};
