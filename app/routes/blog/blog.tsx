import { useEffect, useRef, useState } from 'react';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';

import { InitialMarkdownList, MarkdownFile } from '~/types/markdown';
import { getAllTags, markdownList } from '~/helpers/markdown';
import PageBanner from '~/components/layout/PageBanner';
import BlogList from '~/components/blog/BlogList';
import BlogListSidebar from '~/components/blog/BlogListSidebar';

export const loader: LoaderFunction = async () => {
  const type = 'blog';
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

function Blog() {
  const { initialMarkdownFiles, initialHasMore, totalCount, allTags } = useLoaderData<
    InitialMarkdownList
  >();
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>(initialMarkdownFiles);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagClicked, setTagClicked] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const loadingRef = useRef<HTMLDivElement>(null);

  const loadMoreFiles = async () => {
    const { markdownFiles: newFiles, hasMore: moreFiles } = await markdownList(
      'blog',
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
        'blog',
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
        title="Shoko Blog"
        description="Stay informed with the latest news about Shoko's development, third-party plugins, and other relevant topics."
      />
      <div className="flex min-h-[calc(100vh-557px)] w-full justify-center gap-x-16 py-16">
        <BlogListSidebar
          availableTags={allTags}
          tagCount={totalCount}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          setTagClicked={setTagClicked}
        />
        <BlogList
          data={markdownFiles}
          setTagClicked={setTagClicked}
          tagClicked={tagClicked}
          selectedTags={selectedTags}
        />
      </div>
      {hasMore && <div ref={loadingRef} />}
    </>
  );
}

export default Blog;
