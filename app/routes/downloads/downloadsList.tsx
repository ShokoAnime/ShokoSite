import { useLocation } from '@remix-run/react';
import { PageBanner } from '~/components/layout/PageBanner';
import { DownloadSingle } from '~/components/downloads/DownloadSingle';
import { DownloadGrid } from '~/components/downloads/DownloadGrid';

function Downloads() {
  const location = useLocation();
  const downloadType = location.pathname.split('/').pop();

  if (downloadType === 'shoko-server') {
    return <DownloadSingle />;
  } else {
    return <DownloadGrid />;
  }
}

export default Downloads;
