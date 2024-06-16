import { PageBanner } from '~/components/layout/PageBanner';
import { BlogList } from '~/components/blog/BlogList';
import { useEffect, useRef, useState } from 'react';
import { MarkdownFile } from '~/types/markdown';
import { getAllTags, markdownList } from '~/helpers/markdown';
import BlogFilter from '~/components/blog/BlogFilter';

function Blog() {
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
      'blog',
      clearFiles ? 0 : markdownFiles.length,
      5,
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
      const allTags = await getAllTags('blog');
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

  return (
    <>
      <PageBanner
        title="Shoko Blog"
        description="Stay informed with the latest news about Shoko's development, third-party plugins, and other relevant topics."
      />
      <div className="mx-auto flex h-full min-h-[calc(100vh-557px)] max-w-[1440px] flex-col items-center justify-center gap-y-8 py-16">
        <BlogFilter
          availableTags={allTags}
          tagCount={totalCount}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          setTagClicked={setTagClicked}
        />
        <div className="overflow-y-auto">
          <BlogList data={markdownFiles} setTagClicked={setTagClicked} tagClicked={tagClicked} />
        </div>
        {hasMore && <div ref={loadingRef} />}
      </div>
    </>
  );
}

export default Blog;
