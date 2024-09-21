import { useEffect, useState } from 'react';
import { getMarkdownDetail } from '~/helpers/markdown';
import { useBackground } from '~/hooks/useBackground';
import PageNotFound from '~/components/layout/PageNotFound';
import { useLocation } from '@remix-run/react';
import { MarkdownFile } from '~/types/markdown';
import PageHero from '~/components/layout/PageHero';
import BlogPostContributors from '~/components/blog/BlogPostContributors';
import BlogTags from '~/components/blog/BlogTags';

export default function BlogPost() {
  const [postData, setPostData] = useState<MarkdownFile | null | undefined>(undefined);
  const { setBackgroundImage } = useBackground();
  const location = useLocation();

  useEffect(() => {
    const getPostInfo = async () => {
      const slug = location.pathname.split('/').pop() || '';
      const data = await getMarkdownDetail('blogPost', slug);
      setPostData(data);
    };
    getPostInfo();
  }, [location.pathname]);

  useEffect(() => {
    if (postData) {
      setBackgroundImage(`/images/blog/${postData.frontmatter.image}`);
    }
  }, [postData]);

  if (postData === undefined) return null;

  if (postData === null) {
    return <PageNotFound />;
  }

  return (
    <>
      <PageHero title={postData.frontmatter.title} date={postData.frontmatter.date} />
      <div className="mx-auto my-16 flex w-full max-w-[850px] flex-col justify-center gap-6">
        <div className="shoko-post flex flex-col gap-6">
          {postData.description}
        </div>
        {postData.frontmatter.devs && (
          <div className="flex flex-wrap gap-4">
            {postData.frontmatter.devs && <BlogPostContributors devs={postData.frontmatter.devs} />}
          </div>
        )}
        <BlogTags tags={postData.frontmatter.tags} />
      </div>
    </>
  );
}
