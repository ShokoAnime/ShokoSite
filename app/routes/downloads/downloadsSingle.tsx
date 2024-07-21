import { useEffect, useState } from 'react';
import { useLocation } from '@remix-run/react';

import { markdownDetail } from '~/helpers/markdown';
import { DownloadItem, IconName } from '~/types/downloads';

import PageNotFound from '~/components/layout/PageNotFound';
import PageBanner from '~/components/layout/PageBanner';
import DownloadSidebar from '~/components/downloads/DownloadPostSidebar';
import DownloadPostHeader from '~/components/downloads/DownloadPostHeader';
import SectionHeader from '~/components/common/SectionHeader';
import Image from '~/components/common/Image';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { mdiBookOpenOutline, mdiClockEditOutline } from '@mdi/js';

function DownloadsSingle() {
  const [downloadData, setDownloadData] = useState<DownloadItem>();
  const location = useLocation();

  useEffect(() => {
    const getDownloadInfo = async () => {
      const data = await markdownDetail(location.pathname);
      // @ts-expect-error - data is not undefined.
      setDownloadData(data);
    };
    getDownloadInfo();
  }, [location.pathname]);

  // If the post data is still loading, return null.
  if (downloadData === undefined) return null;

  // If the post is not found, return a 404 page.
  if (downloadData === null) return <PageNotFound />;

  return (
    <>
      <PageBanner title={downloadData.frontmatter.name} />
      <div className="my-16 mx-4 flex flex-col-reverse md:flex-row h-full min-h-[calc(100vh-685px)] gap-y-4 justify-center gap-x-16">
        <DownloadSidebar downloadData={downloadData} />
        <div className="border-shoko-border border-r border-solid" />
        <div className="flex w-full max-w-[850px] flex-col gap-y-6">
          <div className="flex flex-col gap-y-6">
            <DownloadPostHeader title="Description" resources={downloadData.frontmatter.resources} />
            {downloadData.description}
            <div className='flex flex-row flex-wrap gap-2 md:hidden'>
              {downloadData.frontmatter.resources.map(resource => {
                const iconName: IconName = {
                  discord: <FaGithub size={18} />,
                  github: <FaDiscord size={18} />,
                  changelog: mdiClockEditOutline,
                  docs: mdiBookOpenOutline,
                };

                return (<a key={resource.name} className="text-sm" href={resource.url} target="_blank" rel="noreferrer">
                  <Button className="px-2 py-1" buttonType="outline">
                    <Icon icon={iconName[resource.name.toLowerCase()]} />
                    {resource.name}
                  </Button>
                </a>)
              })}
            </div>
          </div>
          <div className="flex flex-col gap-y-6">
            <SectionHeader title="Screenshots" type="h4" />
            <div className="flex flex-wrap gap-4">
              {downloadData.frontmatter.images.map((image, index) => (
                <Image
                  key={index}
                  src={image.url}
                  alt={image.alt}
                  className="shadow-custom md:h-[155px] md:w-[270px] rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DownloadsSingle;
