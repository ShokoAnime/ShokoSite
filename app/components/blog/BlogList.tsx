import { useEffect, useState } from 'react';
import { BlogListProps } from '~/types/blog';
import { convertDate } from '~/helpers/helpers';
import Icon from '~/components/common/Icon';
import { mdiTagMultiple } from '@mdi/js';
import LinkButton from '~/components/common/LinkButton';
import { Link } from '@remix-run/react';

export const BlogList = ({ data, setTagClicked, tagClicked }: BlogListProps) => {
  const [visible, setVisible] = useState(true);
  const [blogData, setBlogData] = useState(data);

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

  return (
    <div className={`transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {blogData.map((file) => (
        <div key={file.filename} className="flex gap-x-16 [&>div]:pb-16 [&>div]:last:pb-0">
          <div className="relative flex flex-col items-center text-center">
            <div className="bg-shoko-text-header border-shoko-border text-shoko-text-alt z-10 flex h-fit w-[6.875rem] flex-col items-center rounded-lg border border-solid px-3 py-2">
              <div className="flex gap-x-2">
                <h4 className="text-shoko-text-alt">{convertDate(file.frontmatter.date, 'array')[1]}</h4>
                <h4 className="text-shoko-text-alt">{convertDate(file.frontmatter.date, 'array')[0]}</h4>
              </div>
              <div className="font-semibold ">{convertDate(file.frontmatter.date, 'array')[2]}</div>
            </div>
            <div className="bg-shoko-border absolute left-1/2 z-0 h-full w-px -translate-x-1/2"></div>
          </div>
          <div className="flex w-full max-w-[900px] flex-col gap-y-6">
            <h3>{file.frontmatter.title}</h3>
            <div className="group relative">
              <img
                className="shadow-custom rounded-lg"
                src={`/images/blog/${file.frontmatter.image}`}
                alt={file.frontmatter.title}
              />
              <Link
                className="text-shoko-link font-semibold"
                to={`/blog/${file.filename.split('/').pop()?.replace('.mdx', '')}`}
              >
                <div className="text-shoko-text-alt font-header absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-gray-900/75 text-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Read More →
                </div>
              </Link>
            </div>
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
            <div className="text-shoko-text line-clamp-5 text-base">{file.description}</div>
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
