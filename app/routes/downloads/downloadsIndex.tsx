import { useEffect, useState } from "react";

import { DownloadsIndexProps } from "~/types/downloads";
import { getDownloadsCount } from "~/helpers/markdown";
import PageBanner from "~/components/layout/PageBanner";
import SectionHeader from "~/components/common/SectionHeader";
import DownloadIndexCard from "~/components/downloads/IndexCard";
import { useMobile } from "~/hooks/useMobile";

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
      <div className="hidden gap-x-2 lg:flex">
        <div className="flex gap-x-2">
          <div className="text-shoko-highlight">{downloadCount?.programs}</div>
          <div>Program / Plugins</div>
        </div>
        <div>|</div>
        <div className="hidden gap-x-2 lg:flex">
          <div className="text-shoko-highlight">{downloadCount?.themes}</div>
          <div>Web UI Themes</div>
        </div>
        <div>|</div>
        <div className="hidden gap-x-2 lg:flex">
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
      <div className="mx-auto flex h-full min-h-[calc(100vh-557px)] max-w-[1440px] flex-col gap-x-2 gap-y-16 py-16 text-shoko-text-header">
        <SectionHeader
          title="Download Categories"
          subtitle={headerSubtitle}
          type="h2"
          center={true}
          opacity={100}
        />
        <DownloadIndexCard />
      </div>
    </>
  );
}

export default DownloadsIndex;
