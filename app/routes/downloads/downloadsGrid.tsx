import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from '@remix-run/react';
import { convertToProperName } from '~/lib/convertToProperName';
import PageHero from '~/components/layout/PageHero';
import DownloadCard from '~/components/downloads/DownloadCard';
import MultiSelectDropdown from '~/components/common/MultiSelectDropdown';
import { Palette, SunMoon } from 'lucide-react';
import { useBackground } from '~/hooks/useBackground';
import { useSentinel } from '~/hooks/useSentinel';
import { ContentItem } from '~/types/content';
import { CategorizedTags } from '~/types/downloads';

const LIMIT = 12;
const SORT = 'dateDescending';

export default function DownloadsGrid() {
  const [downloads, setDownloads] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<CategorizedTags>();
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [themeOptions, setThemeOptions] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const location = useLocation();
  const [loadingRef, isIntersecting] = useSentinel();
  const { resetBackground } = useBackground();
  const totalCountRef = useRef(0);

  const downloadType = location.pathname.split('/')[2];

  const fetchDownloads = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/getFiles?type=${downloadType}&offset=${offset}&limit=${LIMIT}&sort=${SORT}&tags=${
          [...colorOptions, ...themeOptions].join(', ')
        }`,
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json() as { results: ContentItem[], totalCount: number };

      totalCountRef.current = data.totalCount;
      setDownloads(prevDownloads => [
        ...prevDownloads,
        ...data.results.filter((newDownload: ContentItem) =>
          !prevDownloads.some(existingDownload => existingDownload.filename === newDownload.filename)
        ),
      ]);
    } catch (error) {
      console.error('Error fetching download items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [downloadType, offset, colorOptions, themeOptions]);

  const fetchTags = useCallback(async () => {
    if (downloadType !== 'webui-themes') return;

    try {
      const response = await fetch('/api/getAllTags?type=webui-themes');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json() as { tags: string[] };

      const categorizedTags = data.tags.reduce<CategorizedTags>(
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

      setTags(categorizedTags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  }, [downloadType]);

  useEffect(() => {
    resetBackground();
    fetchDownloads();
    fetchTags();
  }, [resetBackground, fetchDownloads, fetchTags]);

  useEffect(() => {
    if (isIntersecting && totalCountRef.current > downloads.length) {
      setOffset(prevOffset => prevOffset + LIMIT);
    }
  }, [downloads.length, isIntersecting]);

  useEffect(() => {
    setDownloads([]);
    setOffset(0);
    fetchDownloads();
  }, [colorOptions, themeOptions, fetchDownloads]);

  return (
    <>
      <PageHero
        title={convertToProperName(location.pathname.split('/').pop() ?? 'downloads')}
      />
      <div className="my-16 flex flex-col gap-6">
        {tags && (
          <div className="flex gap-4 pt-4">
            <MultiSelectDropdown
              title="Select Type"
              icon={<SunMoon />}
              options={tags.themes}
              setSelectedOptions={setThemeOptions}
            />
            <MultiSelectDropdown
              title="Select Colors"
              icon={<Palette />}
              options={tags.colors}
              setSelectedOptions={setColorOptions}
            />
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
          {downloads.map((download) => <DownloadCard key={download.meta.name} data={download} />)}
        </div>
      </div>
      <div ref={loadingRef} />
    </>
  );
}
