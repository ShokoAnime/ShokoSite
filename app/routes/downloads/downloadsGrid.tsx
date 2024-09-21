import { useCallback, useEffect, useRef, useState } from 'react';
import { MarkdownFile } from '~/types/markdown';
import { getAllTags, getMarkdownList } from '~/helpers/markdown';
import { useLocation } from '@remix-run/react';
import { convertToProperName } from '~/helpers/helpers';
import PageHero from '~/components/layout/PageHero';
import DownloadCard from '~/components/downloads/DownloadCard';
import { CategorizedTags, Tag } from '~/types/downloads';
import MultiSelectDropdown from '~/components/common/MultiSelectDropdown';
import { Palette, SunMoon } from 'lucide-react';

export default function DownloadsGrid() {
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<CategorizedTags>();
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [themeOptions, setThemeOptions] = useState<string[]>([]);
  const location = useLocation();
  const loadingRef = useRef<HTMLDivElement>(null);

  const downloadType = location.pathname
    .split('/')
    .pop()
    ?.split('-')
    .map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const loadFiles = async (page: number) => {
    setLoading(true);
    const { markdownFiles: newFiles, hasMore } = await getMarkdownList({
      type: downloadType ?? 'downloads',
      page,
      pageSize: 16,
      sortCondition: 'dateDescending',
      tags: [...colorOptions, ...themeOptions],
    });

    if (page === 1) {
      setMarkdownFiles(newFiles);
    } else {
      setMarkdownFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
    setHasMore(hasMore);
    setLoading(false);
  };

  useEffect(() => {
    const getTags = async () => {
      if (downloadType !== 'webuiThemes') return;

      const fetchedTags: Tag[] = await getAllTags('webuiThemes');

      const categorizedTags = fetchedTags.reduce<CategorizedTags>((acc, tag) => {
        if (['Dark Theme', 'Light Theme', 'OLED Theme'].includes(tag.name)) {
          acc.themes.push(tag);
        } else {
          acc.colors.push(tag);
        }
        return acc;
      }, { themes: [], colors: [] });

      setTags(categorizedTags);
    };

    getTags();
    loadFiles(1);
  }, []);

  useEffect(() => {
    const loadMore = () => {
      if (!hasMore || loading) return;
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadFiles(nextPage);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && markdownFiles.length !== 0) {
        loadMore();
      }
    }, { threshold: 0.5 });

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore, loading, currentPage, markdownFiles.length]);

  useEffect(() => {
    setCurrentPage(1);
    loadFiles(1);
  }, [colorOptions, themeOptions]);

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
        <div className="flex flex-wrap gap-4">
          {markdownFiles.map((download) => <DownloadCard key={download.frontmatter.name} data={download} />)}
        </div>
      </div>
    </>
  );
}
