import { Link } from '@remix-run/react';
import sampleNews from '~/components/home/NewsPost.data';

const NewsPost = () => {
  return (
    <div className="bg-shoko-bg-alt size-full px-6 py-16 2xl:px-0">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center">
        <div className="flex flex-col items-center gap-y-2">
          <h2>Latest News</h2>
          <hr className="border-shoko-highlight w-[100px] border" />
        </div>
        <div className="mt-16 flex gap-x-8">
          {sampleNews.map((news) => (
            <div key={news.title} className="flex flex-col gap-y-6">
              <img className="shadow-custom rounded-lg" src={news.image} alt={news.title} width={450} height={250} />
              <div className="text-shoko-text-header">
                <div className="opacity-65">{news.releasedDate}</div>
                <div className="text-xl">{news.title}</div>
              </div>
              <div>{news.content}</div>

              <Link className="text-shoko-link font-medium" to={news.link}>
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPost;
