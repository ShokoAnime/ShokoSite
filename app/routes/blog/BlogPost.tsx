import PageBanner from '~/components/layout/PageBanner';
import LeftSection from '~/components/blog/LeftSection';
import { useMarkdownList } from '~/hooks/useMarkdownList';
import { useLocation } from '@remix-run/react';
import { markdownDetail } from '~/helpers/markdown-detail';

function BlogPost() {
  const path = useLocation().pathname;
  const post = markdownDetail(path);
  return (
    <>
      <PageBanner
        title="Shoko Blog"
        description="Stay informed with the latest news about Shoko's development, third-party plugins, and other relevant topics."
      />
      <div className="container mx-auto my-16 flex gap-x-16 px-[30px]">
        <LeftSection />
        <div className="flex flex-col gap-y-6 pb-8">
          <img
            src={`/images/blog/${post.frontmatter.image}`}
            alt={post.frontmatter.title}
            className="shadow-custom h-[18.75rem] rounded-lg object-cover object-top"
          />
          <div className="flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div>{post.frontmatter.date}</div>
              <div className="flex gap-x-2">
                {post.frontmatter.tags.map((tag, index, arr) => {
                  if (index === arr.length - 1) {
                    return <span key={tag} className="text-shoko-link">{tag}</span>;
                  }
                  return <span key={tag} className="text-shoko-link">{tag} |</span>;
                })}
              </div>
            </div>
            <div className="text-2xl font-semibold">{post.frontmatter.title}</div>
            {post.description}
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPost;
