import { useEffect, useState } from 'react';
import PageNotFound from '~/components/layout/PageNotFound';
import { useLocation } from '@remix-run/react';
import PageHero from '~/components/layout/PageHero';
import Image from '~/components/common/Image';
import { HeaderBuilderProps, IconNameProps } from '~/types/downloads';
import { SiDiscord, SiGithub } from '@icons-pack/react-simple-icons';
import { BookHeart, Download, ScrollText, Tags } from 'lucide-react';
import { ContentItem } from '~/types/content';
import MDXRenderer from '~/components/common/MarkdownParser';

const HeaderBuilder = ({ title, children }: HeaderBuilderProps) => (
  <div className="flex items-center justify-between gap-y-6 border-b border-shoko-divider pb-3 ">
    <div className="font-header text-shoko-24 font-bold">{title}</div>
    <div className="flex gap-6">{children}</div>
  </div>
);

export default function DownloadSingle() {
  const [downloadData, setDownloadData] = useState<ContentItem>();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchDownload = async () => {
      setIsLoading(true);

      const locationSplit = location.pathname.split('/');
      const type = locationSplit[locationSplit.length === 4 ? 2 : 2];
      const filename = locationSplit[locationSplit.length === 4 ? 3 : 2];

      try {
        const response = await fetch(`/api/getFile?type=${type}&filename=${filename}`);

        if (!response.ok) new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json() as ContentItem;
        setDownloadData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDownload();
  }, []);

  if (isLoading) return null;

  if (downloadData === undefined) {
    return <PageNotFound />;
  }

  const iconName: IconNameProps = {
    discord: <SiDiscord size={24} />,
    github: <SiGithub size={24} />,
    changelog: <ScrollText />,
    docs: <BookHeart />,
  };

  return (
    <>
      <PageHero title={downloadData.meta.name} />
      <div className="my-16 flex w-full flex-col items-center gap-16 xl:flex-row">
        <div className="flex flex-col gap-4">
          <Image
            className="w-full max-w-[360px] md:max-w-[537px]"
            src={downloadData.meta.images[0].url}
            alt={downloadData.meta.images[0].alt}
            zoom={true}
          />
          <div className="flex flex-wrap justify-center gap-2 xl:justify-start">
            {downloadData.meta.images.slice(1, 5).map((image: { url: string, alt: string }, idx: number) => (
              <Image
                key={idx}
                className="h-[72px] w-[112px]"
                src={image.url}
                alt={image.alt}
                zoom={true}
              />
            ))}
          </div>
        </div>
        <div className="flex w-full max-w-[850px] flex-col gap-8">
          <HeaderBuilder title="Info">
            {downloadData.meta.resources.map((resource: { name: string, url: string }) => (
              <a className="flex gap-2" key={resource.name} href={resource.url} target="_blank" rel="noreferrer">
                {iconName[resource.name.toLowerCase()]}
                <span className="hidden md:inline-flex">{resource.name}</span>
              </a>
            ))}
          </HeaderBuilder>
          <div className="shoko-post flex flex-col gap-6">
            <MDXRenderer content={downloadData.content} />
          </div>
          {downloadData.meta.tags && (
            <>
              <HeaderBuilder title="Tags" />
              <div className="flex items-center gap-2">
                <Tags />
                {downloadData.meta.tags.map((tag: string, index: number, arr: []) => (
                  <div key={tag}>
                    {tag}
                    {index !== arr.length - 1 && ' |'}
                  </div>
                ))}
              </div>
            </>
          )}

          <HeaderBuilder title="Downloads">
            <div className="flex flex-col items-center gap-2 md:flex-row">
              <div className="font-semibold text-shoko-highlight">{downloadData.meta.version}</div>
              <div className="hidden md:inline-flex">|</div>
              <div className="font-semibold text-shoko-highlight">{downloadData.meta.date}</div>
            </div>
          </HeaderBuilder>
          <div className="flex flex-col gap-4">
            {downloadData.meta.downloads.map((download: { text: string, links: [] }, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-shoko-divider pb-4 font-semibold last:border-none last:pb-0"
              >
                <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
                  <div>{download.text}</div>
                  <div className="flex flex-wrap gap-6">
                    {download.links.map((link: { name: string, url: string }) => (
                      <a
                        className="flex gap-2 text-shoko-link"
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Download size={20} />
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
