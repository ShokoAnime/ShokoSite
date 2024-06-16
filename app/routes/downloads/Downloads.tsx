import { PageBanner } from '~/components/layout/PageBanner';
import { SectionHeader } from '~/components/common/SectionHeader';
import { DownloadIndexCard } from '~/components/downloads/IndexCard';

function Downloads() {
  const headerSubtitle = (
    <>
      <div className="flex gap-x-2">
        <div className="flex gap-x-2">
          <div className="text-shoko-highlight">8</div>
          <div>Program / Plugins</div>
        </div>
        <div>|</div>
        <div className="flex gap-x-2">
          <div className="text-shoko-highlight">36</div>
          <div>Web UI Themes</div>
        </div>
        <div>|</div>
        <div className="flex gap-x-2">
          <div className="text-shoko-highlight">1</div>
          <div>Renamer Plugin</div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <PageBanner
        title="Downloads"
        description="Browse through selection of programs, plugins, Web UI Themes and other tools available in the Shoko Suite."
      />
      <div className="text-shoko-text-header mx-auto flex h-full min-h-[calc(100vh-557px)] max-w-[1440px] flex-col gap-x-2 gap-y-16 py-16">
        <SectionHeader title="Download Categories" subtitle={headerSubtitle} type="h2" center={true} opacity={100} />
        <DownloadIndexCard />
      </div>
    </>
  );
}

export default Downloads;
