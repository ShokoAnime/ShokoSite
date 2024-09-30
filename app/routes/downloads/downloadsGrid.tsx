import { LoaderFunction, MetaFunction, json } from '@remix-run/cloudflare';
import { useLoaderData, useLocation } from '@remix-run/react';
import { useCallback, useEffect, useState } from 'react';
import { convertToProperName } from '~/lib/convertToProperName';
import PageHero from '~/components/layout/PageHero';
import DownloadCard from '~/components/downloads/DownloadCard';
import MultiSelectDropdown from '~/components/common/MultiSelectDropdown';
import { Palette, SunMoon } from 'lucide-react';
import { useBackground } from '~/hooks/useBackground';
import { useSentinel } from '~/hooks/useSentinel';
import { ContentItem } from '~/types/content';
import { CategorizedTags } from '~/types/downloads';

type JsonContentItem = Omit<ContentItem, 'meta'> & {
  meta?: ContentItem['meta'];
};

const LIMIT = 12;
const SORT = 'dateDescending';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const downloadType = url.pathname.split('/')[2];
  const offset = 0;
  const colorOptions: string[] = [];
  const themeOptions: string[] = [];

  try {
    const baseUrl = `${url.protocol}//${url.host}`;
    const downloadsResponse = await fetch(
      `${baseUrl}/api/getFiles?type=${downloadType}&offset=${offset}&limit=${LIMIT}&sort=${SORT}&tags=${
        [...colorOptions, ...themeOptions].join(', ')
      }`,
    );

    if (!downloadsResponse.ok) throw new Error(`HTTP error! status: ${downloadsResponse.status}`);

    const downloadsData = await downloadsResponse.json() as { results: ContentItem[], totalCount: number };

    let tagsData: CategorizedTags | null = null;
    if (downloadType === 'webui-themes') {
      const tagsResponse = await fetch(`${baseUrl}/api/getAllTags?type=webui-themes`);
      if (tagsResponse.ok) {
        const rawTagsData = await tagsResponse.json() as { tags: string[] };
        tagsData = rawTagsData.tags.reduce<CategorizedTags>(
          (acc, tag) => {
            if (['Dark Theme', 'Light Theme', 'OLED Theme'].includes(tag)) {
              acc.themes.push(tag);
            } else {
              acc.colors.push(tag);
            }
            return acc;
          },
          { themes: [], colors: [] },
        );
      }
    }

    return json({ downloadsData, tagsData, downloadType });
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Response('Not Found', { status: 404 });
  }
};

export const meta: MetaFunction = ({ data }: any) => {
  if (!data) {
    return [
      { title: 'Downloads Page Not Found' },
      { name: 'description', content: 'The requested downloads page could not be found.' },
    ];
  }

  const { downloadType } = data;
  const title = `${convertToProperName(downloadType)}`;
  const description = `Browse and download ${downloadType} for Shoko Anime.`;
  const pageImage = `https://shokoanime.com/images/banners/banner-10.jpg`;
  const pageURL = `https://shokoanime.com/downloads/${downloadType}`;

  const ogImageUrl = `https://shokoanime.com/api/ogImage?title=${encodeURIComponent(`${title}`)}&summary=${
    encodeURIComponent(description)
  }&pageUrl=${encodeURIComponent(pageURL)}&backgroundImage=${encodeURIComponent(`${pageImage}`)}`;

  return [
    { title: title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:type', content: 'article' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: title },
    { property: 'twitter:description', content: description },
    { property: 'twitter:image', content: ogImageUrl },
  ];
};

export default function DownloadsGrid() {
  const { downloadsData, tagsData, downloadType } = useLoaderData<{
    downloadsData: { results: JsonContentItem[], totalCount: number };
    tagsData: CategorizedTags | null;
    downloadType: string;
  }>();

  const [downloads, setDownloads] = useState<ContentItem[]>(() =>
    downloadsData.results.filter((item): item is ContentItem => item.meta !== undefined)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [themeOptions, setThemeOptions] = useState<string[]>([]);
  const [offset, setOffset] = useState(LIMIT);
  const location = useLocation();
  const [loadingRef, isIntersecting] = useSentinel();

  const fetchMoreDownloads = useCallback(async () => {
    if (downloads.length >= downloadsData.totalCount) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/getFiles?type=${downloadType}&offset=${offset}&limit=${LIMIT}&sort=${SORT}&tags=${
          [...colorOptions, ...themeOptions].join(', ')
        }`,
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json() as { results: JsonContentItem[], totalCount: number };

      setDownloads(prevDownloads => [
        ...prevDownloads,
        ...data.results
          .filter((item): item is ContentItem => item.meta !== undefined)
          .filter((newDownload) =>
            !prevDownloads.some(existingDownload => existingDownload.filename === newDownload.filename)
          ),
      ]);
      setOffset(prevOffset => prevOffset + LIMIT);
    } catch (error) {
      console.error('Error fetching more download items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [downloadType, offset, colorOptions, themeOptions, downloads.length, downloadsData.totalCount]);

  useEffect(() => {
    if (isIntersecting && !isLoading && downloads.length < downloadsData.totalCount) {
      fetchMoreDownloads();
    }
  }, [isIntersecting, isLoading, downloads.length, downloadsData.totalCount, fetchMoreDownloads]);

  useEffect(() => {
    setDownloads(downloadsData.results.filter((item): item is ContentItem => item.meta !== undefined));
    setOffset(LIMIT);
  }, [colorOptions, themeOptions, downloadsData.results]);

  return (
    <>
      <PageHero
        title={convertToProperName(location.pathname.split('/').pop() ?? 'downloads')}
      />
      <div className="my-16 flex flex-col gap-6">
        {tagsData && (
          <div className="flex gap-4 pt-4">
            <MultiSelectDropdown
              title="Select Type"
              icon={<SunMoon />}
              options={tagsData.themes}
              setSelectedOptions={setThemeOptions}
            />
            <MultiSelectDropdown
              title="Select Colors"
              icon={<Palette />}
              options={tagsData.colors}
              setSelectedOptions={setColorOptions}
            />
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
          {downloads.map((download) => <DownloadCard key={download.meta.name} data={download} />)}
        </div>
      </div>
      <div ref={loadingRef} />
      {isLoading && <p>Loading more...</p>}
    </>
  );
}
