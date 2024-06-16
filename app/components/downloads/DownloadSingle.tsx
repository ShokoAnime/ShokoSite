import { useEffect, useState } from 'react';
import { useLocation } from '@remix-run/react';
import { DownloadItem } from '~/types/downloads';
import { markdownDetail } from '~/helpers/markdown';
import { DownloadSidebar } from '~/components/downloads/DownloadSidebar';
import { PageNotFound } from '~/components/layout/PageNotFound';
import { DownloadHeader } from '~/components/downloads/DownloadHeader';
import { SectionHeader } from '~/components/common/SectionHeader';
import { Image } from '~/components/common/Image';
import { PageBanner } from '~/components/layout/PageBanner';

export const DownloadSingle = () => {
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
      <PageBanner title="Downloads" />
      <div className="my-16 flex justify-center gap-x-16">
        <DownloadSidebar downloadData={downloadData} />
        <div className="border-shoko-border border-r border-solid" />
        <div className="flex w-full max-w-[850px] flex-col gap-y-6">
          <div className="flex flex-col gap-y-6">
            <DownloadHeader title="Description" resources={downloadData.frontmatter.resources} />
            {downloadData.description}
          </div>
          <div className="flex flex-col gap-y-6">
            <SectionHeader title="Screenshots" type="h4" />
            <div className="flex flex-wrap gap-4">
              {downloadData.frontmatter.images.map((image, index) => (
                <Image
                  key={index}
                  src={image.url}
                  alt={image.alt}
                  className="shadow-custom h-[155px] w-[270px] rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
