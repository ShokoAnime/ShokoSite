import { Tags } from 'lucide-react';
import { BlogTagsProps } from '~/types/blog';

const BlogTags = ({ tags }: BlogTagsProps) => {
  return (
    <div className="mt-6 flex gap-x-2">
      <div className="font-medium text-shoko-highlight">
        <Tags />
      </div>
      <div className="flex flex-wrap gap-x-2">
        {tags.map((tag, index, arr) => (
          <>
            <div key={tag} className="font-medium text-shoko-highlight">
              {tag}
            </div>
            <div>{index !== arr.length - 1 && ' |'}</div>
          </>
        ))}
      </div>
    </div>
  );
};

export default BlogTags;
