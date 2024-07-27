import { useEffect, useState } from 'react';
import { useLocation } from '@remix-run/react';

import { markdownDetail } from '~/helpers/markdown';
import { DownloadItem } from '~/types/downloads';

import PageNotFound from '~/components/layout/PageNotFound';
import PageBanner from '~/components/layout/PageBanner';
import DownloadSidebar from '~/components/downloads/DownloadPostSidebar';
import DownloadPostHeader from '~/components/downloads/DownloadPostHeader';
import SectionHeader from '~/components/common/SectionHeader';
import Image from '~/components/common/Image';

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
      <div className="my-16 flex h-full min-h-[calc(100vh-685px)] justify-center gap-x-16">
        <DownloadSidebar downloadData={downloadData} />
        <div className="border-shoko-border border-r border-solid" />
        <div className="flex w-full max-w-[850px] flex-col gap-y-6">
          <div className="flex flex-col gap-y-6">
            <DownloadPostHeader title="Description" resources={downloadData.frontmatter.resources} />
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
}

export default DownloadsSingle;
