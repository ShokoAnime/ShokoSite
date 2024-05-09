import { isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';
import { convertNameToUrl } from '~/helpers/utils';

import { DownloadsDataType } from '~/types/DownloadsDataType';
import { validPaths } from '~/routes/downloads/Downloads';
import { json } from '@remix-run/node';
import React, { useMemo } from 'react';
import PageNotFound from '~/components/layout/PageNotFound';
import DownloadSingle from '~/components/downloads/DownloadSingle';

type LoaderProps = {
  params: {
    id: string;
    subid: string;
  };
};

type LoaderData = {
  subid: string;
  data: DownloadsDataType[];
};

export function ErrorBoundary() {
  const error = useRouteError();

  console.log(error);

  if (isRouteErrorResponse(error)) {
    return <PageNotFound />;
  }

  return <div>An error occurred</div>;
}

export const loader = async ({ params }: LoaderProps) => {
  const { id, subid } = params;

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

  return json<LoaderData>({ subid, data });
};

function DownloadPageLevel2() {
  const { data, subid } = useLoaderData<LoaderData>();

  const itemData = useMemo(() => {
    return data.find(item => convertNameToUrl(item.name) === subid);
  }, [data]);

  if (!itemData) {
    return <PageNotFound />;
  }

  return <DownloadSingle data={itemData} />;
}

export default DownloadPageLevel2;
