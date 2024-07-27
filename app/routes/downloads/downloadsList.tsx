import { useEffect, useRef, useState } from 'react';
import { useLoaderData, useLocation } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';

import { InitialMarkdownList, MarkdownFile } from '~/types/markdown';
import { getAllTags, markdownList } from '~/helpers/markdown';
import PageBanner from '~/components/layout/PageBanner';
import DownloadGrid from '~/components/downloads/DownloadGrid';
import DownloadGridSidebar from '~/components/downloads/DownloadGridSidebar';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname.split('/').pop();
  const type = pathname ?? 'Downloads';
  const offset = 0;
  const limit = 5;
  const sort = 'sortByDateDescending';
  const tags: string[] = [];

  const { markdownFiles, hasMore, totalCount } = await markdownList(type, offset, limit, sort, tags);
  const allTags = await getAllTags(type);

  return {
    initialMarkdownFiles: markdownFiles,
    initialHasMore: hasMore,
    totalCount,
    allTags,
  };
};

function DownloadsList() {
  const { initialMarkdownFiles, initialHasMore, totalCount, allTags } = useLoaderData<
    InitialMarkdownList
  >();
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>(initialMarkdownFiles);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagClicked, setTagClicked] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const loadingRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const type = location.pathname.split('/').pop();

  const loadMoreFiles = async () => {
    const { markdownFiles: newFiles, hasMore: moreFiles } = await markdownList(
      type ?? 'downloads',
      markdownFiles.length,
      5,
      'sortByDateDescending',
      selectedTags,
    );

    setMarkdownFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setHasMore(moreFiles);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreFiles();
        }
      },
      { threshold: 0.5 },
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore, markdownFiles, selectedTags]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const { markdownFiles: newMarkdownFiles, hasMore: newHasMore } = await markdownList(
        type ?? 'downloads',
        0,
        5,
        'sortByDateDescending',
        selectedTags,
      );

      setMarkdownFiles(newMarkdownFiles);
      setHasMore(newHasMore);
    };

    fetchInitialData();
  }, [selectedTags]);

  return (
    <>
      <PageBanner
        title="Downloads"
        description="Browse through selection of programs, plugins, Web UI Themes and other tools available in the Shoko Suite."
      />
      <div className="mx-auto flex min-h-[calc(100vh-557px)] w-full max-w-[1440px] gap-x-16 py-16">
        {type === 'webui-themes' && (
          <DownloadGridSidebar
            availableTags={allTags}
            tagCount={totalCount}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            setTagClicked={setTagClicked}
          />
        )}
        <DownloadGrid
          data={markdownFiles}
          selectedTags={selectedTags}
          setTagClicked={setTagClicked}
          tagClicked={tagClicked}
          type={type ?? 'downloads'}
        />
      </div>
      {hasMore && <div ref={loadingRef} />}
    </>
  );
}

export default DownloadsList;
