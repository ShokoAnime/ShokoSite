import { useCallback, useEffect, useRef, useState } from 'react';
import { MetaFunction } from '@remix-run/cloudflare';
import PageHero from '~/components/layout/PageHero';
import PostCard from '~/components/blog/PostCard';
import { useSentinel } from '~/hooks/useSentinel';
import {BlogMeta, ContentItem} from '~/types/content';

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
  const [blogPosts, setBlogPosts] = useState<ContentItem<BlogMeta>[]>([]);
  const [loadingRef, isIntersecting] = useSentinel();
  const isLoadingRef = useRef(false);
  const offsetRef = useRef(0);
  const totalCountRef = useRef(0);

  const fetchBlogPosts = useCallback(async () => {
    if (isLoadingRef.current) return;

    const type = 'blog';
    const limit = 16;
    const sort = 'dateDescending';

    isLoadingRef.current = true;
    try {
      const response = await fetch(
        `/api/getFiles?type=${type}&offset=${offsetRef.current}&limit=${limit}&sort=${sort}`,
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json() as { results: ContentItem<BlogMeta>[], totalCount: number };

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
      isLoadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchBlogPosts();
  },[fetchBlogPosts]);

  useEffect(() => {
    if (isIntersecting && totalCountRef.current > blogPosts.length) {
      fetchBlogPosts();
    }
  }, [blogPosts.length, isIntersecting, fetchBlogPosts]);

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
