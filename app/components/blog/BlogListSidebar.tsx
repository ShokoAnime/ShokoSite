import BlogListSpotlight from '~/components/blog/BlogListSpotlight';
import BlogListTags from '~/components/blog/BlogListTags';

const BlogListSidebar = () => (
  <div className="bg-shoko-bg-alt flex w-[28.125rem] flex-col gap-y-8 rounded-lg p-8">
    <BlogListSpotlight />
    <div className="sticky top-32">
      <BlogListTags />
    </div>
  </div>
);

export default BlogListSidebar;
