import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { validPaths } from '~/routes/downloads/Downloads';

import type { DownloadsDataType } from '~/types/DownloadsDataType';
import DownloadSingle from '~/components/downloads/DownloadSingle';
import DownloadGrid from '~/components/downloads/DownloadGrid';

type LoaderProps = {
  params: {
    id: string;
  };
};

type LoaderData = {
  id: string;
  data: DownloadsDataType[];
};

export const loader = async ({ params }: LoaderProps) => {
  const { id } = params;

  if (!validPaths.includes(id)) {
    throw new Response('Not Found', { status: 404 });
  }

  let data: DownloadsDataType[] = [];
  try {
    const importData = await import(`../../data/downloads-${id}.json`);
    data = importData.default;
  } catch (e) {
    throw new Response('Not Found', { status: 404 });
  }

  // Return the item data for valid paths
  return json<LoaderData>({ id, data });
};

function DownloadPageLevel1() {
  const { id, data } = useLoaderData<LoaderData>();

  if (['renamer-plugins', 'legacy', 'web-ui-themes'].includes(id)) return null;

  return data.length === 1 ? <DownloadSingle data={data[0]} /> : <DownloadGrid data={data} />;
}

export default DownloadPageLevel1;
