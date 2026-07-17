import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/cloudflare';
import { useLoaderData, useLocation } from '@remix-run/react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { convertToProperName } from '~/lib/convertToProperName';
import PageHero from '~/components/layout/PageHero';
import DownloadCard from '~/components/downloads/DownloadCard';
import MultiSelectDropdown from '~/components/common/MultiSelectDropdown';
import { Lightbulb, Palette, Sparkles, SunMoon } from 'lucide-react';
import { useSentinel } from '~/hooks/useSentinel';
import {ContentItem, DownloadMeta} from '~/types/content';
import { CategorizedTags } from '~/types/downloads';
import PageNotFound from '~/components/layout/PageNotFound';
import { GitHubRelease } from '~/types/githubRelease';

type JsonContentItem = Omit<ContentItem, 'meta'> & {
  meta?: ContentItem<DownloadMeta>['meta'];
};

const LIMIT = 12;
const SORT = 'dateDescending';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const downloadType = url.pathname.split('/')[2];
  const offset = 0;
  const colorOptions: string[] = [];
  const themeOptions: string[] = [];

  try {
    const baseUrl = `${url.protocol}//${url.host}`;
    const response = await fetch(
      `${baseUrl}/api/getFiles?type=${downloadType}&offset=${offset}&limit=${LIMIT}&sort=${SORT}&tags=${
        [...colorOptions, ...themeOptions].join(', ')
      }`,
    );

    // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    if (!response.ok) return json({ downloadsData: null, tagsData: null, downloadType });

    const downloadsData = await response.json() as { results: ContentItem[], totalCount: number };

    let tagsData: CategorizedTags | null = null;
    if (downloadType === 'webui-themes') {
      const tagsResponse = await fetch(`${baseUrl}/api/getAllTags?type=webui-themes`);
      if (tagsResponse.ok) {
        const rawTagsData = await tagsResponse.json() as { tags: string[] };
        tagsData = rawTagsData.tags.reduce<CategorizedTags>(
          (acc, tag) => {
            if (['Dark Theme', 'Light Theme', 'OLED Theme'].includes(tag)) {
              acc.themes.push(tag);
            } else if (['Animated', 'Static'].includes(tag)) {
              acc.animated.push(tag);
            } else {
              acc.colors.push(tag);
            }
            return acc;
          },
          { themes: [], colors: [], animated: [] },
        );
      }
    }

    return json({ downloadsData, tagsData, downloadType });
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Response('Not Found', { status: 404 });
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data || !data.downloadType) {
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

  const [downloads, setDownloads] = useState<ContentItem<DownloadMeta>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [themeOptions, setThemeOptions] = useState<string[]>([]);
  const [animatedOptions, setAnimatedOptions] = useState<string[]>([]);
  const location = useLocation();
  const [loadingRef, isIntersecting] = useSentinel();
  const isInitialMount = useRef(true);

  const offsetRef = useRef(0);
  const downloadsLengthRef = useRef(0);

  useEffect(() => {
    downloadsLengthRef.current = downloads.length;
  }, [downloads.length]);

  const fetchMoreDownloads = useCallback(
    async (offsetParam?: number) => {
      const currentOffset = offsetParam ?? offsetRef.current;
      if (downloadsLengthRef.current >= downloadsData.totalCount) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/getFiles?type=${downloadType}&offset=${currentOffset}&limit=${LIMIT}&sort=${SORT}&tags=${
            [...colorOptions, ...themeOptions, ...animatedOptions].join(', ')
          }`,
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = (await response.json()) as { results: JsonContentItem[], totalCount: number };
        for (const result of data.results) {
          const meta = result.meta;
          if (meta?.githubRepository) {
            const ghReleaseResponse = await fetch(`/api/getGitHubRelease/${meta.githubRepository}`);
            if (ghReleaseResponse.ok) {
              const ghRelease: GitHubRelease = await ghReleaseResponse.json();
              meta.version = ghRelease.tag_name.startsWith("v") ? ghRelease.tag_name.slice(1) : ghRelease.tag_name;
              meta.date = new Date(ghRelease.published_at || ghRelease.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
            }
          }
        }

        setDownloads((prevDownloads) => [
          ...prevDownloads,
          ...data.results
            .filter((item): item is ContentItem<DownloadMeta> => item.meta !== undefined)
            .filter(
              (newDownload) =>
                !prevDownloads.some((existingDownload) => existingDownload.filename === newDownload.filename),
            ),
        ]);
        offsetRef.current = currentOffset + LIMIT;
      } catch (error) {
        console.error('Error fetching more download items:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [downloadType, colorOptions, themeOptions, animatedOptions, downloadsData.totalCount],
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setDownloads([]);
      offsetRef.current = 0;
      fetchMoreDownloads(0);
    }
  }, [colorOptions, themeOptions, animatedOptions, fetchMoreDownloads]);

  useEffect(() => {
    if (isIntersecting && !isLoading && downloads.length < downloadsData.totalCount) {
      fetchMoreDownloads();
    }
  }, [isIntersecting, downloads.length, downloadsData.totalCount, isLoading, fetchMoreDownloads]);

  if (downloadsData === undefined) {
    return <PageNotFound />;
  }

  return (
    <>
      <PageHero
        title={convertToProperName(location.pathname.split('/').pop() ?? 'downloads')}
      />
      <div className="my-16 flex flex-col gap-6">
        {location.pathname.includes('legacy-apps') && (
          <div className="flex items-center rounded-lg border border-yellow-700 bg-yellow-700/15 p-3">
            <Lightbulb size="20" className="mr-2" />
            Deprecated apps that are listed for archival purposes only.{' '}
            <a
              className="mx-1 text-shoko-link"
              href="https://docs.shokoanime.com/getting-started/available-programs-plugins"
              rel="nofollow noreferrer"
              target="_blank"
            >
              Click Here
            </a>
            to Learn More.
          </div>
        )}
        {tagsData && (
          <>
            <div className="flex items-center rounded-lg border border-blue-700 bg-blue-700/15 p-3">
              <Lightbulb size="20" className="mr-2" />
              Submit Your Own Theme!
              <a
                className="mx-1 text-shoko-link"
                href="https://docs.shokoanime.com/shoko-server/webui-themes"
                rel="nofollow noreferrer"
                target="_blank"
              >
                Click Here
              </a>
              to Learn How.
            </div>
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
              {tagsData.animated.length > 0 && (
                <MultiSelectDropdown
                  title="Select Animation"
                  icon={<Sparkles />}
                  options={tagsData.animated}
                  setSelectedOptions={setAnimatedOptions}
                />
              )}
            </div>
          </>
        )}
        <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
          {downloads.map((download) => <DownloadCard key={download.meta.name} data={download} />)}
        </div>
      </div>
      <div ref={loadingRef} />
    </>
  );
}
