import { useEffect, useState } from 'react';

import { DownloadsIndexProps } from '~/types/downloads';
import { getDownloadsCount } from '~/helpers/markdown';
import PageBanner from '~/components/layout/PageBanner';
import SectionHeader from '~/components/common/SectionHeader';
import DownloadIndexCard from '~/components/downloads/IndexCard';

function DownloadsIndex() {
  const [downloadCount, setDownloadCount] = useState<DownloadsIndexProps>();

  useEffect(() => {
    const getPostInfo = async () => {
      const data = await getDownloadsCount();
      setDownloadCount(data);
    };
    getPostInfo();
  }, []);

  const headerSubtitle = (
    <>
      <div className="hidden lg:flex flex-col lg:flex-row gap-2 lg:gap-x-2">
        <div className="flex gap-x-2">
          <div className="text-shoko-highlight">{downloadCount?.programs}</div>
          <div>Program / Plugins</div>
        </div>
        <div className='hidden lg:inline-block'>|</div>
        <div className="flex gap-x-2">
          <div className="text-shoko-highlight">{downloadCount?.themes}</div>
          <div>Web UI Themes</div>
        </div>
        <div className='hidden lg:inline-block'>|</div>
        <div className="flex gap-x-2">
          <div className="text-shoko-highlight">{downloadCount?.renamers}</div>
          <div>Renamer Plugin</div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <PageBanner
        title="DownloadsIndex"
        description="Browse through selection of programs, plugins, Web UI Themes and other tools available in the Shoko Suite."
      />
      <div className="text-shoko-text-header mx-auto flex h-full min-h-[calc(100vh-557px)] max-w-[1440px] flex-col gap-x-2 gap-y-16 py-16">
        <SectionHeader title="Download Categories" subtitle={headerSubtitle} type="h2" center={true} opacity={100} />
        <DownloadIndexCard />
      </div>
    </>
  );
}

export default DownloadsIndex;
