import { useEffect, useState } from 'react';
import { getMarkdownDetail } from '~/helpers/markdown';
import PageNotFound from '~/components/layout/PageNotFound';
import { useLocation } from '@remix-run/react';
import { MarkdownFile } from '~/types/markdown';
import PageHero from '~/components/layout/PageHero';
import Image from '~/components/common/Image';
import { HeaderBuilderProps, IconNameProps } from '~/types/downloads';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { BookHeart, Download, ScrollText, Tags } from 'lucide-react';

export default function DownloadSingle() {
  const [downloadData, setDownloadData] = useState<MarkdownFile | null | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    const getPostInfo = async () => {
      const slug = location.pathname.split('/').pop() || '';
      const data = await getMarkdownDetail('downloadSingle', slug);
      setDownloadData(data);
    };
    getPostInfo();
  }, [location.pathname]);

  if (downloadData === undefined) return null;

  if (downloadData === null) {
    return <PageNotFound />;
  }

  const HeaderBuilder = ({ title, children }: HeaderBuilderProps) => (
    <div className="flex items-center justify-between gap-y-6 border-b border-shoko-divider pb-3 ">
      <div className="font-header text-shoko-24 font-bold">{title}</div>
      <div className="flex gap-6">{children}</div>
    </div>
  );

  const iconName: IconNameProps = {
    discord: <FaGithub size={24} />,
    github: <FaDiscord size={24} />,
    changelog: <ScrollText />,
    docs: <BookHeart />,
  };

  return (
    <>
      <PageHero title={downloadData.frontmatter.name} />
      <div className="my-16 flex w-full items-center gap-16">
        <div className="flex flex-col gap-4">
          <Image
            className="w-full max-w-[537px]"
            src={downloadData.frontmatter.images[0].url}
            alt={downloadData.frontmatter.images[0].alt}
            zoom={true}
          />
          <div className="flex gap-2">
            {downloadData.frontmatter.images.slice(1, 5).map((image, index) => (
              <div key={index} className="h-[72px] w-[126px]">
                <Image
                  src={image.url}
                  alt={image.alt}
                  zoom={true}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <HeaderBuilder title="Info">
            {downloadData.frontmatter.resources.map((resource) => (
              <a className="flex gap-2" key={resource.name} href={resource.url} target="_blank" rel="noreferrer">
                {iconName[resource.name.toLowerCase()]}
                {resource.name}
              </a>
            ))}
          </HeaderBuilder>
          <div className="shoko-post flex flex-col gap-6">{downloadData.description}</div>
          {downloadData.frontmatter.tags && (
            <>
              <HeaderBuilder title="Tags" />
              <div className="flex items-center gap-2">
                <Tags />
                {downloadData.frontmatter.tags.map((tag, index, arr) => (
                  <div key={tag}>
                    {tag}
                    {index !== arr.length - 1 && ' |'}
                  </div>
                ))}
              </div>
            </>
          )}

          <HeaderBuilder title="Downloads">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-shoko-highlight">{downloadData.frontmatter.version}</div>
              <div>|</div>
              <div className="font-semibold text-shoko-highlight">{downloadData.frontmatter.date}</div>
            </div>
          </HeaderBuilder>
          <div className="flex flex-col gap-4">
            {downloadData.frontmatter.downloads.map((download, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-shoko-divider pb-4 font-semibold last:border-none last:pb-0"
              >
                <div className="flex w-full justify-between">
                  <div>{download.text}</div>
                  <div className="flex gap-6">
                    {download.links.map((link) => (
                      <a
                        className="it flex gap-2 text-shoko-link"
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
