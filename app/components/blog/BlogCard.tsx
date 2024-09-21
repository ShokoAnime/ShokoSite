import { Link } from '@remix-run/react';
import { BlogCardProps } from '~/types/blog';
import { convertDate } from '~/helpers/helpers';
import Image from '~/components/common/Image';

const BlogCard = ({ file, image, title, date, description }: BlogCardProps) => {
  return (
    <div className="flex max-w-[330px] flex-col gap-6">
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
      <div className="flex flex-col">
        <div className="text-shoko-14 font-semibold text-shoko-text-75">{convertDate(date)}</div>
        <div className="line-clamp-1 font-header text-shoko-18 font-bold">{title}</div>
      </div>
      <div className="line-clamp-3">{description}</div>
    </div>
  );
};

export default BlogCard;
