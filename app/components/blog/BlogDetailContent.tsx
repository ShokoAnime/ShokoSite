import { BlogPostProps } from '~/types/BlogTypes';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

type BlogDetailSidebar = {
  data: BlogPostProps;
};

const BlogDetailContent = ({ data }: BlogDetailSidebar) => {
  return (
    <Zoom zoomMargin={65}>
      <div className="flex w-full max-w-[900px] flex-col gap-y-6 text-base font-normal" id="markdown">
        {data.description}
      </div>
    </Zoom>
  );
};

export default BlogDetailContent;
