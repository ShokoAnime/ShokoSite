import { useEffect, useRef, useState } from 'react';
import PageHero from '~/components/layout/PageHero';
import PostCard from '~/components/blog/PostCard';
import { useSentinel } from '~/hooks/useSentinel';
import { ContentItem } from '~/types/content';
import { useBackground } from '~/hooks/useBackground';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [loadingRef, isIntersecting] = useSentinel();
  const totalCountRef = useRef(0);
  const { resetBackground } = useBackground();

  const type = 'blog';
  const limit = 12;
  const sort = 'dateDescending';

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/getFiles?type=${type}&offset=${offset}&limit=${limit}&sort=${sort}`,
      );

      if (!response.ok) new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json() as { results: ContentItem[], totalCount: number };

      totalCountRef.current = data.totalCount;
      setBlogPosts(prevPosts => [
        ...prevPosts,
        ...data.results.filter((newPost: ContentItem) =>
          !prevPosts.some(existingPost => existingPost.filename === newPost.filename)
        ),
      ]);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  useEffect(() => {
    resetBackground();
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    if (isIntersecting && totalCountRef.current > blogPosts.length) {
      setOffset(prevOffset => prevOffset + 16);
      fetchBlogPosts();
    }
  }, [blogPosts.length, isIntersecting]);

  return (
    <>
      <PageHero
        title="Shoko Blog"
        description="Stay informed with the latest news about Shoko's development, third-party plugins, and other relevant topics."
      />
      <div className="my-8 flex flex-wrap gap-5 lg:my-16">
        {blogPosts.map(({ filename, meta, content }) => (
          <PostCard
            key={filename}
            file={filename}
            image={meta.image}
            title={meta.title}
            date={meta.date}
            description={content}
          />
        ))}
      </div>
      <div ref={loadingRef} />
    </>
  );
}
