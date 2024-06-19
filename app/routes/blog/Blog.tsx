import { useEffect, useRef, useState } from 'react';

import { MarkdownFile } from '~/types/markdown';
import PageBanner from '~/components/layout/PageBanner';
import BlogFilter from '~/components/blog/BlogFilter';
import BlogList from '~/components/blog/BlogList';
import BlogListSidebar from '~/components/blog/BlogListSidebar';

function Blog() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [allTags, setAllTags] = useState<[]>([]);
  const [tagClicked, setTagClicked] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchMarkdownList = async (newOffset: number, tags: string[]) => {
    console.log('Called');
    const url = new URL('/api/getMarkdownList', window.location.origin);
    url.searchParams.set('offset', newOffset.toString());
    url.searchParams.set('type', 'blog');

    if (tags.length > 0) {
      url.searchParams.set('tags', tags.join(','));
    }

    const response = await fetch(url.toString());
    const { markdownFiles: newMarkdownFiles, hasMore: newHasMore, totalCount } = await response.json();

    return { newMarkdownFiles, newHasMore, totalCount };
  };

  const fetchTags = async () => {
    const response = await fetch('/api/getTags?type=blog');
    const { allTags } = await response.json();
    setAllTags(allTags);
  };

  const fetchInitialData = async () => {
    setMarkdownFiles([]);

    const { newMarkdownFiles, newHasMore, totalCount } = await fetchMarkdownList(0, selectedTags);

    setMarkdownFiles(newMarkdownFiles);
    setHasMore(newHasMore);
    setOffset(5);
    setTotalCount(totalCount);

    await fetchTags();
  };

  const loadMore = async () => {
    const newOffset = offset + 5;
    const { newMarkdownFiles, newHasMore } = await fetchMarkdownList(newOffset, selectedTags);

    setMarkdownFiles((prevFiles) => [...prevFiles, ...newMarkdownFiles]);
    setHasMore(newHasMore);
    setOffset(newOffset);
  };

  useEffect(() => {
    fetchInitialData();
  }, [selectedTags]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
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
  }, [hasMore, offset, selectedTags]);

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
