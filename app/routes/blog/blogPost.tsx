import { LoaderFunction, MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ContentItem } from '~/types/content';
import PageNotFound from '~/components/layout/PageNotFound';
import PageHero from '~/components/layout/PageHero';
import PostContributors from '~/components/blog/PostContributors';
import PostTags from '~/components/blog/PostTags';
import MDXRenderer from '~/components/common/MarkdownParser';
import { useEffect } from 'react';
import { useBackground } from '~/hooks/useBackground';
import { sanitizeContent } from '~/lib/sanitizeContent';

export const loader: LoaderFunction = async ({ params, request }) => {
  const filename = params.id; // Assuming your route is like /blog/:slug

  if (!filename) {
    throw new Response('Not Found', { status: 404 });
  }

  try {
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const response = await fetch(`${baseUrl}/api/getFile?type=blog&filename=${filename}`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const postData = await response.json() as ContentItem;
    return json({ postData });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw new Response('Not Found', { status: 404 });
  }
};

export const meta: MetaFunction = ({ data }: any) => {
  if (!data || !data.postData) {
    return [
      { title: 'Post Not Found' },
      { name: 'description', content: 'The requested blog post could not be found.' },
    ];
  }

  const { postData } = data;
  const ogImageUrl = `/api/ogImage?
    title=${encodeURIComponent(postData.meta.title)}&
    summary=${encodeURIComponent(postData.meta.description || '')}&
    date=${encodeURIComponent(postData.meta.date)}&
    pageUrl=${encodeURIComponent(`https://shokoanime.comg/bog/${postData.filename}`).replace('.mdx,', '')}&
    backgroundImage=${encodeURIComponent(postData.meta.image)}`;

  const sanitizedDescription = sanitizeContent(postData.meta.description);

  return [
    { title: postData.meta.title },
    { name: 'description', content: sanitizedDescription },
    { property: 'og:title', content: postData.meta.title },
    { property: 'og:description', content: sanitizedDescription },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: postData.meta.date },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: postData.meta.title },
    { property: 'twitter:description', content: sanitizedDescription },
    { property: 'twitter:image', content: ogImageUrl },
  ];
};

export default function BlogPost() {
  const { postData } = useLoaderData<{ postData: ContentItem }>();
  const { setBackgroundImage } = useBackground();

  useEffect(() => {
    if (postData) {
      setBackgroundImage(`/images/blog/${postData.meta.image}`);
    }
  }, [postData]);

  if (!postData) {
    return <PageNotFound />;
  }

  return (
    <>
      <PageHero title={postData.meta.title} date={postData.meta.date} />
      <div className="mx-auto my-8 flex w-full max-w-[850px] flex-col justify-center gap-6 lg:my-16">
        <div className="shoko-post flex flex-col gap-6 text-start">
          <MDXRenderer content={postData.content} />
        </div>
        {postData.meta.devs && (
          <div className="flex flex-wrap gap-4">
            <PostContributors devs={postData.meta.devs} />
          </div>
        )}
        <PostTags tags={postData.meta.tags} />
      </div>
    </>
  );
}
