import { Navigate, useLocation } from '@remix-run/react';
import PageNotFound from '~/components/layout/PageNotFound';
import PageBanner from '~/components/layout/PageBanner';
import DownloadNavTabs from '~/components/downloads/DownloadNavTabs';
import DownloadCallout from '~/components/downloads/DownloadCallout';
import DownloadItem from '~/components/downloads/DownloadItem';
import DownloadGrid from '~/components/downloads/DownloadGrid';
import { useEffect, useState } from 'react';
import { markdownList } from '~/helpers/markdown-list';
import { DownloadSingleProps } from '~/types/DownloadTypes';
import { downloadMessage } from '~/components/downloads/DownloadCallout.utils';
import { markdownDetail } from '~/helpers/markdown-detail';

const validPaths = [
  'downloads',
  'shoko-server',
  'media-player-plugins',
  'web-ui-themes',
  'renamer-plugins',
  'legacy',
];

function Downloads() {
  const path = useLocation().pathname;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DownloadSingleProps[]>();
  const [pathName, setPathName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const pathSegments = path.split('/');
      const newPathName = pathSegments[2];
      setPathName(newPathName);

      const markdownData = newPathName === 'shoko-server'
        ? markdownDetail([...pathSegments, 'shoko-server'].join('/'))
        : markdownList(newPathName ?? '');

      const markdownDataCheck = Array.isArray(markdownData) ? markdownData : [markdownData];

      setData(markdownDataCheck);
      setIsLoading(false);
    };

    fetchData();
  }, [path]);

  document?.querySelector('#download-list')?.scrollIntoView({ block: 'end' });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!pathName) {
    return <Navigate to="/downloads/shoko-server" replace />;
  }

  if (!validPaths.includes(pathName)) {
    return <PageNotFound />;
  }

  return (
    <>
      <PageBanner
        title="Downloads"
        description="Browse through our complete selection of programs, plugins, Web UI Themes and other tools available in the Shoko Suite."
      />
      <DownloadNavTabs />
      <div className="mx-auto flex min-h-[calc(100vh-645px)] max-w-[1440px] flex-col gap-y-16 p-16 2xl:px-0 2xl:py-16">
        <DownloadCallout
          icon={downloadMessage(pathName).icon}
          message={downloadMessage(pathName).content}
        />
        {!isLoading && data !== undefined && (
          pathName === 'shoko-server'
            ? <DownloadItem data={data[0]} />
            : <DownloadGrid data={data} />
        )}
      </div>
    </>
  );
}

export default Downloads;
