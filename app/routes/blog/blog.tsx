import { useCallback, useEffect, useRef, useState } from 'react';
import { MetaFunction } from '@remix-run/cloudflare';
import PageHero from '~/components/layout/PageHero';
import PostCard from '~/components/blog/PostCard';
import { useSentinel } from '~/hooks/useSentinel';
import { ContentItem } from '~/types/content';

export const meta: MetaFunction = () => {
  const pageTitle = 'Shoko Blog';
  const pageDescription =
    'Stay informed with the latest news about Shoko\'s development, third-party plugins, and other relevant topics.';
  const pageImage = 'https://shokoanime.com/images/banners/banner-2.jpg';
  const pageURL = 'https://shokoanime.com/blog';

  const ogImageUrl = `https://shokoanime.com/api/ogImage?title=${encodeURIComponent(pageTitle)}&summary=${
    encodeURIComponent(pageDescription)
  }&pageUrl=${encodeURIComponent(pageURL)}&backgroundImage=${encodeURIComponent(pageImage)}`;

  return [
    { title: pageTitle },
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:type', content: 'article' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: pageTitle },
    { property: 'twitter:description', content: pageDescription },
    { property: 'twitter:image', content: ogImageUrl },
  ];
};

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [loadingRef, isIntersecting] = useSentinel();
  const totalCountRef = useRef(0);

  const fetchBlogPosts = useCallback(async () => {
    if (isLoading) return;

    const type = 'blog';
    const limit = 16;
    const sort = 'dateDescending';

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/getFiles?type=${type}&offset=${offset}&limit=${limit}&sort=${sort}`,
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json() as { results: ContentItem[], totalCount: number };

      totalCountRef.current = data.totalCount;
      setBlogPosts(prevPosts => [
        ...prevPosts,
        ...data.results.filter((newPost: ContentItem) =>
          !prevPosts.some(existingPost => existingPost.filename === newPost.filename)
        ),
      ]);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [offset, isLoading]);

  useEffect(() => {
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
