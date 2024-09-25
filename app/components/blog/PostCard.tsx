import { Link } from '@remix-run/react';
import { PostCardProps } from '~/types/blog';
import Image from '~/components/common/Image';
import { convertDate } from '~/lib/convertDate';
import { sanitizeContent } from '~/lib/sanitizeContent';

const PostCard = ({ file, image, title, date, description }: PostCardProps) => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row 2xl:max-w-[330px] 2xl:flex-col">
      <div className="group relative">
        <Image
          src={`/images/blog/${image}`}
          alt={title}
          className="w-full rounded-lg object-cover shadow-custom transition-opacity duration-300 group-hover:opacity-75"
        />
        <Link to={`/blog/${file.split('/').pop()?.replace('.mdx', '')}`}>
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-900/75 font-body text-shoko-24 text-shoko-text opacity-0 transition-opacity duration-300 hover:border hover:border-shoko-link group-hover:opacity-100">
            Read More →
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-center gap-4 text-center lg:max-w-[600px] lg:text-start 2xl:w-full 2xl:flex-col">
        <div>
          <div className="text-shoko-14 font-semibold text-shoko-text-75">{convertDate(date)}</div>
          <div className="line-clamp-1 font-header text-shoko-18 font-bold">{title}</div>
        </div>
        <div className="line-clamp-3">{sanitizeContent(description)}</div>
      </div>
    </div>
  );
};

export default PostCard;
