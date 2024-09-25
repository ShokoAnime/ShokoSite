import { useEffect, useState } from 'react';
import { useBackground } from '~/hooks/useBackground';
import PageNotFound from '~/components/layout/PageNotFound';
import { useLocation } from '@remix-run/react';
import PageHero from '~/components/layout/PageHero';
import PostContributors from '~/components/blog/PostContributors';
import PostTags from '~/components/blog/PostTags';
import { ContentItem } from '~/types/content';
import MDXRenderer from '~/components/common/MarkdownParser';

export default function BlogPost() {
  const [postData, setPostData] = useState<ContentItem>();
  const [isLoading, setIsLoading] = useState(true);
  const { setBackgroundImage } = useBackground();
  const location = useLocation();

  const filename = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchBlogPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/getFile?type=blog&filename=${filename}`);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json() as ContentItem;
        setPostData(data);
        setBackgroundImage(`/images/blog/${data.meta.image}`);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [filename, setBackgroundImage]);

  if (isLoading) return null;

  if (postData === undefined) {
    return <PageNotFound />;
  }

  return (
    <>
      <PageHero title={postData.meta.title} date={postData.meta.date} />
      <div className="mx-auto my-16 flex w-full max-w-[850px] flex-col justify-center gap-6">
        <div className="shoko-post flex flex-col gap-6 text-center md:text-start">
          <MDXRenderer content={postData.content} />
        </div>
        {postData.meta.devs && (
          <div className="flex flex-wrap gap-4">
            {postData.meta.devs && <PostContributors devs={postData.meta.devs} />}
          </div>
        )}
        <PostTags tags={postData.meta.tags} />
      </div>
    </>
  );
}
