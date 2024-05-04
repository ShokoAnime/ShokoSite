import { DownloadIndex, Loading } from '~/components';
import { useDownloadsContext } from '~/context/DownloadsContext';
import { Outlet, useLocation } from '@remix-run/react';
import { useEffect } from 'react';

export default function DownloadCategory() {
  const { tab, data, isLoading, setIsLoading } = useDownloadsContext();
  const { pathname } = useLocation();
  const pageURL = pathname.split('/');
  const isDownloadIndexPage = pageURL.length === 3;

  return (
    <>
      <div className="mx-auto flex min-h-[calc(100vh-644px)] max-w-[1440px] flex-1 flex-col gap-y-16 py-16">
        {isLoading ? <Loading /> : data
          ? (
            isDownloadIndexPage ? <DownloadIndex data={data} tab={tab} /> : <Outlet />
          )
          : (
            <div className="text-center">
              <p className="text-lg text-gray-600">Failed to load data.</p>
            </div>
          )}
      </div>
    </>
  );
}
