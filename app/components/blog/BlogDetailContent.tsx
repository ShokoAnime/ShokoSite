import { BlogPostProps } from '~/types/BlogTypes';

type BlogDetailSidebar = {
  data: BlogPostProps;
};

const BlogDetailContent = ({ data }: BlogDetailSidebar) => {
  return (
    <div className="flex w-full max-w-[850px] flex-col gap-y-6 text-base font-normal" id="blog-post">
      {data.description}
    </div>
  );
};

export default BlogDetailContent;
