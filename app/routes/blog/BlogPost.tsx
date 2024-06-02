import { useEffect } from 'react';
import { useLocation } from '@remix-run/react';
import { useBlogData } from '~/context/BlogContext';
import BlogDetailBanner from '~/components/blog/BlogDetailBanner';
import BlogDetailSidebar from '~/components/blog/BlogDetailSidebar';
import PageNotFound from '~/components/layout/PageNotFound';
import BlogDetailContent from '~/components/blog/BlogDetailContent';

function BlogPost() {
  const { pathname } = useLocation();
  const { fetchBlogDetail, blogDetail } = useBlogData();

  useEffect(() => {
    if (pathname) {
      fetchBlogDetail(pathname);
    }
  }, [pathname]);

  if (blogDetail === undefined) {
    return <PageNotFound />;
  }

  return (
    blogDetail === null ? <div>Loading</div> : (
      <>
        <BlogDetailBanner
          title={blogDetail.frontmatter.title}
          image={blogDetail.frontmatter.image}
        />
        <div className="text-shoko-text-header mx-auto my-16 flex h-full min-h-[calc(100vh-824px)] max-w-[1440px] justify-between text-xl font-medium">
          <BlogDetailSidebar data={blogDetail} />
          <BlogDetailContent data={blogDetail} />
        </div>
      </>
    )
  );
}

export default BlogPost;
