import { Link } from '@remix-run/react';
import { useBlogData } from '~/context/BlogContext';
import { useEffect, useState } from 'react';
import SkeletonLoader from '~/components/common/SkeletonLoader';
import { convertDate, convertNameToUrl } from '~/helpers/utils';
import Icon from '~/components/common/Icon';
import { mdiArrowRight } from '@mdi/js';
import LinkButton from '~/components/common/LinkButton';

const NewsPost = () => {
  const { blogList, fetchBlogList } = useBlogData();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    fetchBlogList(['All']);
    setIsFetched(true);
  }, [isFetched]);

  return (
    <div className="bg-shoko-bg-alt size-full px-6 py-16 2xl:px-0">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center">
        <div className="flex flex-col items-center gap-y-2">
          <h2>Latest News</h2>
          <hr className="border-shoko-highlight w-[100px] border" />
        </div>
        <div className="mt-16 flex w-full gap-x-8">
          {!isFetched || !blogList ? <SkeletonLoader type="index-blog" /> : (
            blogList
              .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
              .slice(0, 3)
              .map((news) => (
                <div key={news.frontmatter.title} className="flex w-full max-w-[450px] flex-col gap-y-6">
                  <div className="relative">
                    <img
                      className="shadow-custom rounded-lg"
                      src={`/images/blog/${news.frontmatter.image}`}
                      alt={news.frontmatter.title}
                    />
                    <Link
                      className="font-medium"
                      to={`/blog/${news.filename.split('/').pop()?.replace('.md', '')}`}
                    >
                      <div className="text-shoko-text-alt absolute inset-0 flex items-center justify-center rounded-lg bg-gray-900/65 text-2xl opacity-0 transition-opacity duration-300 hover:opacity-100">
                        Read More →
                      </div>
                    </Link>
                  </div>
                  <div className="text-shoko-text-header">
                    <div className="text-shoko-text-header font-medium opacity-65">
                      {convertDate(news.frontmatter.date)}
                    </div>
                    <div className="text-shoko-text-header line-clamp-1 text-xl font-semibold">
                      {news.frontmatter.title}
                    </div>
                  </div>
                  <div className="line-clamp-3">{news.description}</div>
                  <Link
                    className="text-shoko-link font-medium"
                    to={`/blog/${news.filename.split('/').pop()?.replace('.md', '')}`}
                  >
                    Read More →
                  </Link>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPost;
