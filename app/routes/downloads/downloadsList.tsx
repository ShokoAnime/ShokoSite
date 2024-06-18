import { useEffect, useRef, useState } from 'react';
import { useLocation } from '@remix-run/react';

import { getAllTags, markdownList } from '~/helpers/markdown';
import { MarkdownFile } from '~/types/markdown';

import DownloadGrid from '~/components/downloads/DownloadGrid';
import PageNotFound from '~/components/layout/PageNotFound';

function Downloads() {
  const location = useLocation();
  const downloadType = location.pathname.split('/').pop();

  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagClicked, setTagClicked] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const loadMoreFiles = async (clearFiles = false) => {
    if (clearFiles) {
      setMarkdownFiles([]);
    }

    const { markdownFiles: newFiles, hasMore: moreFiles, totalCount } = await markdownList(
      downloadType ?? 'downloads',
      clearFiles ? 0 : markdownFiles.length,
      6,
      'sortByDateDescending',
      selectedTags,
    );

    // Get new data and filter out any duplicates.
    setMarkdownFiles((prevFiles) => {
      const uniqueNewFiles = newFiles.filter(
        (newFile) => !prevFiles.some((prevFile) => prevFile.filename === newFile.filename),
      );
      return clearFiles ? uniqueNewFiles : [...prevFiles, ...uniqueNewFiles];
    });

    setHasMore(moreFiles);
    setTotalCount(totalCount);
  };

  useEffect(() => {
    const fetchTags = async () => {
      const allTags = await getAllTags('web-ui-themes');
      setAllTags(allTags);
    };

    fetchTags();
  }, []);

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
  }, [hasMore, markdownFiles]);

  useEffect(() => {
    loadMoreFiles(true);
  }, [selectedTags]);

  // If the post data is still loading, return null.
  if (markdownFiles === undefined) return null;

  // If the post is not found, return a 404 page.
  if (markdownFiles === null) return <PageNotFound />;

  return (
    <>
      <DownloadGrid data={markdownFiles} />
      {hasMore && <div ref={loadingRef} />}
    </>
  );
}

export default Downloads;
