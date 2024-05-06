import { Link } from '@remix-run/react';

const sampleNews: { title: string, image: string, releasedDate: string, link: string, content: string }[] = [
  {
    title: 'Shoko Version 4.1.2 Released',
    content:
      'After many months of internal and public testing, the latest version fo Nakamori is now available for download! This update is probably one of the biggest to date with Nakamori being completely rewritten...',
    releasedDate: 'November 18th, 2023',
    link: '#',
    image: '/images/home/blog-01.webp',
  },
  {
    title: 'Shoko Version 4.1.1 Released',
    content:
      'This maintenance release addresses a few reported bugs and a few under-the-hood changes that won’t affect most users. However, its main purpose is it allows Shoko Server to work with our latest media …',
    releasedDate: 'October 20th, 2023',
    link: '#',
    image: '/images/home/blog-02.webp',
  },
  {
    title: 'Shoko Version 4.1.0 Released',
    content:
      'After many months of internal and public testing, the latest version fo Nakamori is now available for download! This update is probably one of the biggest to date with Nakamori being completely rewritten...',
    releasedDate: 'October 5th, 2023',
    link: '#',
    image: '/images/home/blog-03.webp',
  },
];

export const NewsPost = () => {
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
