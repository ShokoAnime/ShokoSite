import { useLocation } from '@remix-run/react';
import { useDownloadsContext } from '~/context/DownloadsContext';
import { useDownloadData } from '~/hooks/useDownloadData';
import { urlFormatProper } from '~/helpers/urlFormat';
import { mdiLightbulbAlertOutline } from '@mdi/js';
import {
  DownloadCallout,
  DownloadNavTabs,
  DownloadSingle,
  Footer,
  Header,
  Loading,
  PageBanner,
  PageNotFound,
} from '~/components';

interface SelectedFileProps {
  name: string;
  images: string[];
  description: string;
  resources: { name: string, url: string }[];
  downloads: { text: string, links: { name: string, version: string, date: string, url: string }[] }[];
}

export default function DownloadPageLevel2() {
  const { data, isLoading } = useDownloadsContext();
  const location = useLocation();
  const downloadType = location.pathname.split('/')[2];

  useDownloadData(downloadType);

  const getSelectedFile = (data: never[] | string[], pathname: string) => {
    const fileName = urlFormatProper(pathname.split('/').pop() || '');
    return data.find((item: string | SelectedFileProps) => {
      if (typeof item === 'object' && 'name' in item) {
        return item.name === fileName;
      }
      return false;
    });
  };

  // @ts-expect-error - Types match, but TS doesn't know that data is defined.
  const selectedFile: SelectedFileProps = getSelectedFile(data, location.pathname);

  if (isLoading && data.length === 0) {
    return (
      <>
        <Header />
        <div className="text-shoko-text-header mx-auto flex h-full min-h-[calc(100vh-197px)] max-w-[1440px] items-center justify-center gap-x-2 text-xl font-medium">
          <Loading />
        </div>
        <Footer altBackground={true} />
      </>
    );
  }

  if (selectedFile === undefined) {
    return (
      <>
        <Header />
        <div className="text-shoko-text-header mx-auto flex h-full max-w-[1440px] items-center justify-center gap-x-2 text-xl font-medium">
          <PageNotFound />
        </div>
        <Footer altBackground={true} />
      </>
    );
  }

  return (
    <>
      <Header />
      <PageBanner title={selectedFile.name} />
      <DownloadNavTabs />
      <div className="mx-auto flex min-h-[calc(100vh-645px)] max-w-[1440px] flex-col gap-y-16 p-16 2xl:px-0 2xl:py-16">
        <div className="flex flex-col gap-y-16">
          {isLoading ? <Loading /> : (
            <>
              <DownloadCallout
                icon={mdiLightbulbAlertOutline}
                message={
                  <span className="text-shoko-text text-base">
                    Learn how to make your own Shoko application / plugin using our extensive API.{' '}
                    <a
                      className="text-shoko-link font-medium"
                      href="/"
                      target="_blank"
                      rel="noopener"
                    >
                      Click Here to learn more!
                    </a>
                  </span>
                }
              />
              <DownloadSingle data={selectedFile} />
            </>
          )}
        </div>
      </div>
      <Footer altBackground={true} />
    </>
  );
}
