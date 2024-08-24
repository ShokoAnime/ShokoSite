import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import { mdiTagMultiple } from '@mdi/js';

import { BlogListProps } from '~/types/blog';
import { convertDate } from '~/helpers/helpers';

import Icon from '~/components/common/Icon';
import Button from '~/components/common/Button';
import Text from '~/components/common/Text';
import cx from 'classnames';

const BlogList = ({ data, setTagClicked, tagClicked, selectedTags }: BlogListProps) => {
  const [blogData, setBlogData] = useState(data);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (tagClicked) {
      setVisible(false);
      const timeout = setTimeout(() => {
        setVisible(true);
        setBlogData(data);
        setTagClicked(false);
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      setVisible(true);
      setBlogData(data);
    }
  }, [data, tagClicked]);

  if (blogData.length === 0 && selectedTags.length !== 0) {
    return (
      <div className={cx('w-full max-w-[1000px]', visible ? 'opacity-100' : 'opacity-0')}>
        <h4>Looks like there were no posts with your selected criteria.</h4>
      </div>
    );
  }

  return (
    <div
      className={cx(
        'flex w-full max-w-[1000px] flex-col gap-y-8 transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      {blogData.map((file) => (
        <div
          key={file.filename}
          className="flex flex-col gap-y-8 border-b border-shoko-border pb-8 last:border-0 last:pb-0"
        >
          <div className="flex flex-col gap-y-6">
            <div className="group relative">
              <img
                className="rounded-lg shadow-custom"
                src={`/images/blog/${file.frontmatter.image}`}
                alt={file.frontmatter.title}
              />
              <div className="absolute left-5 top-5 flex flex-col items-center rounded-lg font-header shadow-custom">
                <div className="flex h-8 w-12 items-center justify-center rounded-t-lg bg-shoko-bg font-header text-xl font-bold text-shoko-text-header lg:h-10 lg:w-16 lg:text-2xl">
                  {convertDate(file.frontmatter.date, 'array')[0]}
                </div>
                <div className="flex h-8 w-12  items-center justify-center rounded-b-lg bg-shoko-highlight font-header text-lg font-bold text-shoko-text-alt lg:h-10 lg:w-16 lg:text-2xl">
                  {convertDate(file.frontmatter.date, 'array')[1]}
                </div>
              </div>
              <Link
                className="font-semibold text-shoko-link"
                to={`/blog/${file.filename.split('/').pop()?.replace('.mdx', '')}`}
              >
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-gray-900/75 font-header text-2xl text-shoko-text-alt opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Read More →
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-2">
                <Icon className="font-medium text-shoko-highlight" icon={mdiTagMultiple} />
                <div className="flex flex-wrap gap-x-2">
                  {file.frontmatter.tags.map((tag, index, arr) => (
                    <div
                      key={tag}
                      className="font-medium text-shoko-highlight"
                    >
                      {tag}
                      {index !== arr.length - 1 && ' |'}
                    </div>
                  ))}
                </div>
              </div>
              <Text size="h2">{file.frontmatter.title}</Text>
              <div className="line-clamp-4 text-shoko-text">{file.description}</div>
            </div>
            <Button
              className="w-full lg:w-fit"
              buttonType="primary"
              to={`/blog/${file.filename.split('/').pop()?.replace('.mdx', '')}`}
            >
              Read More →
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
