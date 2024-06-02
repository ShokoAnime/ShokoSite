import PageBanner from '~/components/layout/PageBanner';
import BlogListSidebar from '~/components/blog/BlogListSidebar';
import BlogList from '~/components/blog/BlogList';
import { useEffect } from 'react';

function Blog() {
  useEffect(() => {
    document?.querySelector('#blog-list')?.scrollIntoView({ block: 'end' });
  }, []);

  return (
    <>
      <PageBanner
        title="Shoko Blog"
        description="Stay informed with the latest news about Shoko's development, third-party plugins, and other relevant topics."
      />
      <div className="absolute -m-20" id="blog-list" />
      <div className="container mx-auto my-16 flex gap-x-16 px-[30px]">
        <BlogListSidebar />
        <BlogList />
      </div>
    </>
  );
}

export default Blog;
