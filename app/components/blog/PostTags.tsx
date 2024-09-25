import { Tags } from 'lucide-react';
import { PostTagsProps } from '~/types/blog';

const PostTags = ({ tags }: PostTagsProps) => {
  return (
    <div className="mt-6 flex justify-center gap-2 md:justify-start">
      <div className="font-medium text-shoko-highlight">
        <Tags />
      </div>
      {tags.map((tag, index, arr) => (
        <div key={tag} className="flex flex-wrap gap-x-2">
          <div className="font-medium text-shoko-highlight">
            {tag}
          </div>
          {index !== arr.length - 1 && <div>|</div>}
        </div>
      ))}
    </div>
  );
};

export default PostTags;
