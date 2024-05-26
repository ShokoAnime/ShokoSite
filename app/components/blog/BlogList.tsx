import { useNavigate } from '@remix-run/react';
import cx from 'classnames';
import { mdiArrowRight, mdiTagMultiple } from '@mdi/js';
import Icon from '~/components/common/Icon';
import Button from '~/components/common/Button';
import { convertDate } from '~/helpers/utils';

type BlogPreviewProps = {
  title: string;
  date: string;
  tags: string[];
  url: string;
  image: string;
  description: string;
  className?: string;
};

type BlogListProps = {
  content: {
    frontmatter: BlogPreviewProps;
    content: string;
  }[];
};

const BlogPreview = ({ url, tags, date, title, image, className, description }: BlogPreviewProps) => {
  const navigate = useNavigate();
  return (
    <div className={cx('flex flex-col gap-y-6 pb-8', className)}>
      <img
        src={`/images/blog/${image}`}
        alt={title}
        className="shadow-custom h-[18.75rem] rounded-lg object-cover object-top"
      />
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <div>{convertDate(date)}</div>
          <div className="flex gap-x-2">
            <Icon icon={mdiTagMultiple} className="text-shoko-link" />
            {tags.map((tag, index, arr) => {
              if (index === arr.length - 1) {
                return <span key={tag} className="text-shoko-link">{tag}</span>;
              }
              return <span key={tag} className="text-shoko-link">{tag} |</span>;
            })}
          </div>
        </div>
        <div className="text-2xl font-semibold">{title}</div>
        <div className="line-clamp-5">
          {description}
        </div>
        <Button buttonType="primary" className="flex w-[165px]" onClick={() => navigate(url)}>
          <span>Read More</span>
          <Icon icon={mdiArrowRight} />
        </Button>
      </div>
    </div>
  );
};

const BlogList = ({ content }: BlogListProps) => {
  const blogData = content.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });

  return (
    <div className="flex w-[900px] flex-col">
      {blogData.map((item, index, arr) => {
        const className = index !== arr.length - 1 ? 'border-b mb-8' : 'mb-0';
        return (
          <BlogPreview
            key={item.frontmatter.title}
            {...item.frontmatter}
            description={item.content}
            className={className}
          />
        );
      })}
    </div>
  );
};

export default BlogList;
