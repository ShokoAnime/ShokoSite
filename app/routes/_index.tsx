import type { MetaFunction } from '@remix-run/node';
import { Footer, Header } from '~/components/layout';
import { Button } from '~/components/common';
import { uniqueId } from 'lodash-es';
import { Benefit, InfoGroup, NewsPost } from '~/components/home/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookSkull, faDownload, faPlay } from '@fortawesome/free-solid-svg-icons';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

const sampleNews: { title: string, image: string, releasedDate: Date, link: string, content: string }[] = [
  {
    title: 'Shoko Version 4.1.2 Released ',
    content:
      'After many months of internal and public testing, the latest version fo Nakamori is now available for download! This update is probably one of the biggest to date with Nakamori being completely rewritten...',
    releasedDate: new Date(Date.parse('2023-11-18')),
    link: '#',
    image: '/images/home/5.png',
  },
  {
    title: 'Shoko Version 4.1.2 Released ',
    content:
      'This maintenance release addresses a few reported bugs and a few under-the-hood changes that won’t affect most users. However, its main purpose is it allows Shoko Server to work with our latest media …',
    releasedDate: new Date(Date.parse('2023-10-20')),
    link: '#',
    image: '/images/home/6.png',
  },
  {
    title: 'Shoko Version 4.1.2 Released ',
    content:
      'After many months of internal and public testing, the latest version fo Nakamori is now available for download! This update is probably one of the biggest to date with Nakamori being completely rewritten...',
    releasedDate: new Date(Date.parse('2023-10-05')),
    link: '#',
    image: '/images/home/7.png',
  },
];

const mediaPlayers = [
  { name: 'Nakamori | Shokodi', mediaPlayer: 'Kodi Plugin', image: '/images/icons/kodi.svg' },
  { name: 'Shoko Metadata | ShokoRelay', mediaPlayer: 'Plex Agent & Scanner', image: '/images/icons/plex.svg' },
  { name: 'My Anime 3', mediaPlayer: 'MediaPortal 1 Plugin', image: '/images/icons/media-portal.svg' },
  { name: 'Shokofin', mediaPlayer: 'Jellyfin Plugin', image: '/images/icons/jellyfin.svg' },
];

export default function Index() {
  return (
    <div>
      <Header />

      {/* Hero */}
      <div className="mx-auto max-w-[1440px] px-6 py-16 2xl:px-0">
        <div className="flex flex-col items-center justify-center gap-x-16 gap-y-12 2xl:flex-row">
          <div className="flex flex-col items-center justify-center gap-y-8 text-center">
            <h1 className="w-full max-w-[53.125rem] text-pretty">
              The All-in-One Cross-Platform Anime Management System Built For You
            </h1>
            <h4 className="w-full text-textBody-light dark:text-textBody-dark">Let Shoko take you to the future</h4>
            <div className="flex gap-x-2">
              <Button buttonType="primary">
                <FontAwesomeIcon icon={faDownload} size="lg" />
                <span>Download Ver 4.3.0</span>
              </Button>
              <Button buttonType="outline" onClick={() => window.open('https://docs.shokoanime.com', '_blank')}>
                <FontAwesomeIcon icon={faBookSkull} size="lg" />
                <span>Getting Started</span>
              </Button>
            </div>
          </div>
          <div className="relative w-full 2xl:w-fit">
            <img
              src="/images/home/1.png"
              alt="preview png"
              className="mx-auto flex items-center 2xl:max-w-[630px]"
            />
            <Button
              buttonType="primary"
              className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center !rounded-full"
            >
              <FontAwesomeIcon className="pl-2" icon={faPlay} size="2xl" />
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits of Shoko */}
      <div className="size-full bg-backgroundAlt-light px-6 py-16 dark:bg-backgroundAlt-dark 2xl:px-0">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-y-16">
          <div className="flex flex-col items-center gap-y-2">
            <h2>Benefits of Shoko</h2>
            <hr className="w-[100px] border border-highlight-light dark:border-highlight-dark" />
          </div>
          <div className="grid w-full grid-cols-3 gap-8">
            <Benefit />
          </div>
        </div>
      </div>

      {/* Info Groups */}
      <div className="shoko-page mx-auto max-w-[1440px] px-6 py-16 2xl:px-0">
        <div className="flex flex-col items-center gap-y-16 2xl:gap-y-32">
          <InfoGroup
            title="Collection Management Made Easy"
            image="/images/home/2.png"
            content={
              <>
                <span>
                  <span className="font-medium text-highlight-light dark:text-highlight-dark">Shoko</span>{' '}
                  is a free, open-source, cross-platform anime collection management system that automates the process
                  of organizing your library. It eliminates the need to manually input series information or rename
                  files to conform to specific formats for basic series data. Shoko simplifies anime management, making
                  it easier to organize and enjoy your collection.
                </span>
                <span>
                  Shoko streamlines the process for you, ensuring that your collection is always well-organized, easily
                  accessible across multiple devices with one of our many media player plugins, and most importantly,
                  automatically maintained.
                </span>
                <span className="font-medium text-highlight-light dark:text-highlight-dark">
                  It&apos;s important to note that Shoko does not offer any means to download files, stream files from
                  streaming sites, or access files that are not part of your personal collection.
                </span>
              </>
            }
          />
          <InfoGroup
            title="Spend More Time Watching Anime"
            image="/images/home/3.png"
            reverse={true}
            content={
              <>
                <span>
                  With Shoko, you can have your anime collection up and running within just five minutes. Shoko
                  automatically populates your database with information about the various series and episodes in your
                  collection by hashing each file for comparison against{' '}
                  <a href="https://anidb.net" target="_blank" rel="noreferrer">AniDB&apos;s</a>{' '}
                  extensive database. Shoko also utilizes additional metadata sources to provide even more information
                  and integration, ensuring that your collection is complete and well-organized.
                </span>
                <span>
                  Once your collection is set up, all that&apos;s left for you to do is decide which series you want to
                  watch.
                </span>
              </>
            }
          />
          <InfoGroup
            title="Media Player Support"
            image="/images/home/4.png"
            content={
              <>
                <span>
                  Shoko offers more than just automated collection management. It also supports a wide range of media
                  players, allowing you to watch your collection on the device of your choice anywhere you’d like.
                </span>
                <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-y-8">
                  {mediaPlayers.map((data) => (
                    <div key={data.name} className="flex items-center gap-x-4">
                      <img width={60} height={60} src={data.image} alt={data.name} />
                      <div className="flex flex-col">
                        <span className="font-medium text-textHeader-light dark:text-textHeader-dark">{data.name}</span>
                        <span>{data.mediaPlayer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            }
          />
        </div>
      </div>

      {/* Latest NewsPost */}
      <div className="size-full bg-backgroundAlt-light px-6 py-16 dark:bg-backgroundAlt-dark 2xl:px-0">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center">
          <div className="flex flex-col items-center gap-y-2">
            <h2>Latest News</h2>
            <hr className="w-[100px] border border-highlight-light dark:border-highlight-dark" />
          </div>
          <div className="mt-16 flex gap-x-8">
            {sampleNews.map((x) => (
              <NewsPost
                key={uniqueId('news')}
                title={x.title}
                image={x.image}
                releaseDate={x.releasedDate}
                content={x.content}
                link={x.link}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
