import { useEffect, useState } from 'react';
import { useDownloadsContext } from '~/context/DownloadsContext';
import { DownloadSingle, Loading } from '~/components';
import { useParams } from '@remix-run/react';
import { useDownloadsData } from '~/hooks/useDownloadsData';

const findMatchedFile = (data, fileName) => {
  return data.find(file => file.name.toLowerCase() === fileName.toLowerCase());
};

export default function DownloadFile() {
  const { tab, isLoading, data } = useDownloadsContext();
  const [file, setFile] = useState(null);
  const { file: fileName } = useParams();

  useDownloadsData(tab);

  useEffect(() => {
    if (data) {
      const matchedFile = findMatchedFile(data, fileName);
      setFile(matchedFile);
    }
  }, [data, fileName]);

  return (
    <div className="mx-auto flex h-full max-w-[1440px] items-center justify-center gap-x-2">
      {isLoading ? <Loading /> : <DownloadSingle data={file} />}
    </div>
  );
}
