import cx from 'classnames';
import { mdiArrowRight, mdiTagMultiple } from '@mdi/js';
import Icon from '~/components/common/Icon';
import { convertDate } from '~/helpers/utils';
import LinkButton from '~/components/common/LinkButton';
import { BlogPreviewProps } from '~/types/BlogTypes';
import { useBlogData } from '~/context/BlogContext';
import { useEffect, useState } from 'react';
import SkeletonLoader from '~/components/common/SkeletonLoader';

const BlogPreview = ({ url, tags, date, title, image, className, description }: BlogPreviewProps) => {
  const postUrl = url.split('/').pop()?.replace('.md', '');

  return (
    <div className={cx('flex flex-col gap-y-6 pb-8', className)}>
      <img
        src={`/images/blog/${image}`}
        alt={title}
        className="shadow-custom h-[18.75rem] rounded-lg object-cover object-top"
      />
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <div className="text-shoko-text-header font-medium opacity-65">{convertDate(date)}</div>
          <div className="flex gap-x-2">
            <Icon icon={mdiTagMultiple} className="text-shoko-highlight" />
            {tags.slice(0, 4).map((tag, index, arr) => (
              <div
                key={tag}
                className="text-shoko-highlight font-medium"
              >
                {tag}
                {index !== arr.length - 1 && ' |'}
                {tags.length > 4 && index === 3 && ` | +${tags.length - 4} More`}
              </div>
            ))}
          </div>
        </div>
        <h4 className="text-shoko-text-header font-semibold">{title}</h4>
      </div>
      <div className="line-clamp-5">
        {description}
      </div>
      <LinkButton buttonType="primary" className="w-40 p-3" to={postUrl ?? ''}>
        <div className="mx-auto flex items-center gap-x-2">
          Read More
          <Icon icon={mdiArrowRight} />
        </div>
      </LinkButton>
    </div>
  );
};

const BlogList = () => {
  const { blogList, fetchBlogList } = useBlogData();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    fetchBlogList(['All']);
    setIsFetched(true);
  }, [isFetched]);

  if (!isFetched || !blogList) {
    return <SkeletonLoader type="blog list" />;
  }

  const blogData = blogList.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });

  return (
    <div className="flex w-[900px] flex-col">
      {blogData.map((item, index, arr) => {
        const className = index !== arr.length - 1 ? 'border-b mb-8' : 'mb-0';
        return (
          <BlogPreview
            key={item.filename}
            className={className}
            title={item.frontmatter.title}
            date={item.frontmatter.date}
            url={item.filename}
            description={item.description}
            image={item.frontmatter.image}
            tags={item.frontmatter.tags}
          />
        );
      })}
    </div>
  );
};

export default BlogList;
