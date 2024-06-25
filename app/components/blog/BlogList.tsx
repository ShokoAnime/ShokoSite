import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import { mdiTagMultiple } from '@mdi/js';

import { BlogListProps } from '~/types/blog';
import { convertDate } from '~/helpers/helpers';

import Icon from '~/components/common/Icon';
import LinkButton from '~/components/common/LinkButton';
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
        'flex flex-col gap-y-8 w-full max-w-[1000px] transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      {blogData.map((file) => (
        <div
          key={file.filename}
          className="border-shoko-border flex flex-col gap-y-8 border-b pb-8 last:border-0 last:pb-0"
        >
          <div className="flex flex-col gap-y-6">
            <div className="group relative">
              <img
                className="shadow-custom rounded-lg"
                src={`/images/blog/${file.frontmatter.image}`}
                alt={file.frontmatter.title}
              />
              <div className="font-header shadow-custom absolute left-5 top-5 flex flex-col items-center rounded-lg">
                <div className="bg-shoko-bg font-header text-shoko-text-header flex h-10 w-16 items-center justify-center rounded-t-lg text-2xl font-bold">
                  {convertDate(file.frontmatter.date, 'array')[0]}
                </div>
                <div className="bg-shoko-highlight font-header text-shoko-text-alt flex h-10 w-16 items-center justify-center rounded-b-lg text-xl font-bold">
                  {convertDate(file.frontmatter.date, 'array')[1]}
                </div>
              </div>
              <Link
                className="text-shoko-link font-semibold"
                to={`/blog/${file.filename.split('/').pop()?.replace('.mdx', '')}`}
              >
                <div className="text-shoko-text-alt font-header absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-gray-900/75 text-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Read More →
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-2">
                <Icon className="text-shoko-highlight font-medium" icon={mdiTagMultiple} />
                <div className="flex flex-wrap gap-x-2">
                  {file.frontmatter.tags.map((tag, index, arr) => (
                    <div
                      key={tag}
                      className="text-shoko-highlight font-medium"
                    >
                      {tag}
                      {index !== arr.length - 1 && ' |'}
                    </div>
                  ))}
                </div>
              </div>
              <h2>{file.frontmatter.title}</h2>
              <div className="text-shoko-text line-clamp-4">{file.description}</div>
            </div>
            <LinkButton
              className="w-fit"
              buttonType="primary"
              to={`/blog/${file.filename.split('/').pop()?.replace('.mdx', '')}`}
            >
              Read More →
            </LinkButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
