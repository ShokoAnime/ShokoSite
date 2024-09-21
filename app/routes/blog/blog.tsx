import { useEffect, useRef, useState } from 'react';
import { MarkdownFile } from '~/types/markdown';
import { getMarkdownList } from '~/helpers/markdown';
import PageHero from '~/components/layout/PageHero';
import BlogCard from '~/components/blog/BlogCard';

export default function Blog() {
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);

  const loadFiles = async (page: number) => {
    setLoading(true);
    const { markdownFiles: newFiles, hasMore, totalCount } = await getMarkdownList({
      type: 'blog',
      page,
      pageSize: 16,
      sortCondition: 'dateDescending',
    });

    if (page === 1) {
      setMarkdownFiles(newFiles);
    } else {
      setMarkdownFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
    setHasMore(hasMore);
    setTotalCount(totalCount);
    setLoading(false);
  };

  useEffect(() => {
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

  return (
    <>
      <PageHero
        title="Shoko Blog"
        description="Stay informed with the latest news about Shoko's development, third-party plugins, and other relevant topics."
      />
      <div className="my-16 flex flex-wrap gap-5">
        {markdownFiles.map((file) => (
          <BlogCard
            key={file.filename}
            file={file.filename}
            image={file.frontmatter.image}
            title={file.frontmatter.title}
            date={file.frontmatter.date}
            description={file.description}
          />
        ))}
      </div>
      <div ref={loadingRef} />
    </>
  );
}
