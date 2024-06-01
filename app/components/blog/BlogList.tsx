import cx from 'classnames';
import { mdiDownload, mdiTagMultiple } from '@mdi/js';
import Icon from '~/components/common/Icon';
import { convertDate } from '~/helpers/utils';
import LinkButton from '~/components/common/LinkButton';
import { BlogPreviewProps } from '~/types/BlogTypes';
import { useBlogData } from '~/context/BlogContext';
import { useEffect, useState } from 'react';
import Loading from '~/components/common/Loading';

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
        <LinkButton buttonType="primary" className="!p-4" to={postUrl ?? ''}>
          <div className="mx-auto flex items-center gap-x-2">
            <Icon icon={mdiDownload} />
            Read More
          </div>
        </LinkButton>
      </div>
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
    return (
      <div className="w-full items-center">
        <Loading />
      </div>
    );
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
