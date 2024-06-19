import { useEffect, useRef, useState } from 'react';
import { Link } from '@remix-run/react';

import { MarkdownFile } from '~/types/markdown';
import { markdownList } from '~/helpers/markdown';
import { convertDate } from '~/helpers/helpers';

import SectionHeader from '~/components/common/SectionHeader';

const LatestNews = () => {
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const loadMoreFiles = async () => {
    const { markdownFiles: newFiles, hasMore: moreFiles } = await markdownList(
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

    // Update the hasMore state
    setHasMore(moreFiles);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore) {
          loadMoreFiles();
        }
      },
      { threshold: 0.5 },
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore, markdownFiles]);

  useEffect(() => {
    loadMoreFiles();
  }, []);

  return (
    <div className="bg-shoko-bg-alt border-shoko-border flex flex-col items-center justify-center gap-y-16 border-t border-solid py-16">
      <SectionHeader title="Latest News" type="h2" center={true} />
      <div className="flex w-full max-w-[1440px] gap-x-8">
        {markdownFiles.map((file, index) => (
          <div
            key={index}
            className="border-shoko-border flex w-full max-w-[28.75rem] flex-col rounded-lg border border-solid"
          >
            <div className="group relative">
              <img
                className="rounded-t-lg"
                src={`/images/blog/${file.frontmatter.image}`}
                alt={file.frontmatter.title}
              />
              <div className="font-header shadow-custom absolute left-5 top-5 flex flex-col items-center rounded-lg">
                <div className="bg-shoko-bg text-shoko-text-header flex h-10 w-[4.375rem] items-center justify-center rounded-t-lg text-2xl font-bold">
                  {convertDate(file.frontmatter.date, 'array')[0]}
                </div>
                <div className="bg-shoko-highlight font-header text-shoko-text-alt flex h-10 w-[4.375rem] items-center justify-center rounded-b-lg text-xl font-bold">
                  {convertDate(file.frontmatter.date, 'array')[1]}
                </div>
              </div>
              <Link
                className="text-shoko-link font-semibold"
                to={`/blog/${file.filename.split('/').pop()?.replace('.mdx', '')}`}
              >
                <div className="text-shoko-text-alt font-header absolute inset-0 flex cursor-pointer items-center justify-center rounded-t-lg bg-gray-900/75 text-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Read More →
                </div>
              </Link>
            </div>
            <div className="bg-shoko-bg flex flex-col gap-y-6 rounded-lg p-6">
              <div className="text-shoko-text-header font-header line-clamp-1 text-xl font-medium">
                {file.frontmatter.title}
              </div>
              <div className="text-shoko-text font-body line-clamp-3">
                {file.description}
              </div>
              <Link
                className="text-shoko-link font-semibold"
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
