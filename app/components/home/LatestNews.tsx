import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';

import { MarkdownFile } from '~/types/markdown';
import { markdownList } from '~/helpers/markdown';
import { convertDate } from '~/helpers/helpers';

import SectionHeader from '~/components/common/SectionHeader';
import Text from '~/components/common/Text';

const LatestNews = () => {
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);

  const loadMoreFiles = async () => {
    const { markdownFiles: newFiles } = await markdownList(
      'blog',
      markdownFiles.length,
      3,
      'sortByDateDescending',
      [],
    );

    // Update the state with new unique files
    setMarkdownFiles((prevFiles) => {
      const uniqueNewFiles = newFiles.filter(
        (newFile) => !prevFiles.some((prevFile) => prevFile.filename === newFile.filename),
      );
      return [...prevFiles, ...uniqueNewFiles];
    });
  };

  useEffect(() => {
    if (markdownFiles.length === 3) return;
    loadMoreFiles();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-y-16 border-t border-solid border-shoko-border bg-shoko-bg-alt px-6 py-16">
      <SectionHeader title="Latest News" type="h2" center={true} />
      <div className="flex w-full flex-col justify-center gap-6 lg:flex-row">
        {markdownFiles.map((file, index) => (
          <div
            key={index}
            className="flex w-full flex-col rounded-lg border border-solid border-shoko-border lg:max-w-[28.75rem]"
          >
            <div className="group relative">
              <img
                className="rounded-t-lg"
                src={`/images/blog/${file.frontmatter.image}`}
                alt={file.frontmatter.title}
              />
              <div className="absolute left-5 top-5 flex flex-col items-center rounded-lg font-header shadow-custom">
                <div className="flex h-10 w-[4.375rem] items-center justify-center rounded-t-lg bg-shoko-bg text-2xl font-bold text-shoko-text-header">
                  {convertDate(file.frontmatter.date, 'array')[0]}
                </div>
                <div className="flex h-10 w-[4.375rem] items-center justify-center rounded-b-lg bg-shoko-highlight font-header text-xl font-bold text-shoko-text-alt">
                  {convertDate(file.frontmatter.date, 'array')[1]}
                </div>
              </div>
              <Link
                className="font-semibold text-shoko-link"
                to={`/blog/${file.filename.split('/').pop()?.replace('.mdx', '')}`}
              >
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-t-lg bg-gray-900/75 font-header text-2xl text-shoko-text-alt opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Read More →
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-y-6 rounded-lg bg-shoko-bg p-6">
              <Text className="line-clamp-1 font-medium" size="blogHeader" type="header">
                {file.frontmatter.title}
              </Text>
              <Text className="line-clamp-3" size="blogText">
                {file.description}
              </Text>
              <Link
                className="font-semibold text-shoko-link"
                to={`/blog/${file.filename.split('/').pop()?.replace('.mdx', '')}`}
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
