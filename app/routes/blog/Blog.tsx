import PageBanner from '~/components/layout/PageBanner';
import LeftSection from '~/components/blog/LeftSection';
import BlogList from '~/components/blog/BlogList';
import { useMarkdownList } from '~/hooks/useMarkdownList';

function Blog() {
  return (
    <>
      <PageBanner
        title="Shoko Blog"
        description="Stay informed with the latest news about Shoko's development, third-party plugins, and other relevant topics."
      />
      <div className="container mx-auto my-16 flex gap-x-16 px-[30px]">
        <LeftSection />
        <BlogList content={useMarkdownList('blog')} />
      </div>
    </>
  );
}

export default Blog;