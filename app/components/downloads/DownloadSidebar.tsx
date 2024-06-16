import { SectionHeader } from '~/components/common/SectionHeader';
import { DownloadItem, PlatformData } from '~/types/downloads';

type DownloadSidebar = {
  downloadData: DownloadItem;
};

export const DownloadSidebar = ({ downloadData }: DownloadSidebar) => {
  return (
    <div className="flex w-full max-w-[12.5rem] flex-col gap-y-8">
      <div className="flex flex-col gap-y-6">
        <SectionHeader title="File Information" type="h4" />
        <div className="flex flex-col gap-y-1">
          <div className="font-header font-medium">Version</div>
          <div className="font-body">{downloadData.frontmatter.version}</div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="font-header font-medium">Release Date</div>
          <div className="font-body">{downloadData.frontmatter.date}</div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="font-header font-medium">Platforms</div>
          <div className="text-shoko-text flex flex-wrap font-normal">
            {downloadData.frontmatter.downloads.map(
              (platform: PlatformData, index: number) => {
                return (
                  <div key={platform.text} className="text-shoko-highlight font-medium">
                    {index !== downloadData.frontmatter.downloads.length - 1
                      ? `${platform.text},\u00A0`
                      : platform.text}
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-6">
        <SectionHeader title="Download Links" type="h4" />
        {downloadData.frontmatter.downloads.map(
          (platform: PlatformData) => {
            return (
              <div key={platform.text} className="flex flex-col gap-y-1">
                <div className="font-header font-medium">{platform.text}</div>
                <div className="flex gap-x-2">
                  {platform.links.map((link, linkIndex) => (
                    <div className="flex gap-x-2" key={link.name}>
                      {linkIndex !== 0 && <div>|</div>}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-body text-shoko-link"
                      >
                        {link.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};
