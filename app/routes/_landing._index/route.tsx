import type { MetaFunction } from '@remix-run/node';
import { Footer, Header } from '~/routes/_landing';
import { Button } from '~/components/common';
import News from './news';
import { uniqueId } from 'lodash-es';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

const sampleNews: { title: string; image: string; releasedDate: Date; link: string; content: string }[] = [
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

export default function Index() {
  return (
    <>
      <Header />
      <div className="container mx-auto pt-16 pb-16">
        <div className="flex gap-[64px] justify-center">
          <div className="flex flex-col items-center justify-center text-center  gap-y-8">
            <h2 className="text-5xl w-full">The All-in-One Cross-Platform Anime Management System Built For You</h2>
            <h3 className="text2xl w-full">Let Shoko take you to the future</h3>
            <div className="flex gap-x-2">
              <Button type="primary" className="flex gap-x-1">
                <span className="mdi mdi-download" />
                <span>Download Ver 4.3.0 </span>
              </Button>
              <Button type="secondary-outline" className="flex gap-x-1">
                <span className="mdi mdi-text-box-outline" />
                <span>Getting started</span>
              </Button>
            </div>
          </div>
          <img src="/images/home/1.png" alt="preview png" className="w-[50%]" />
        </div>
      </div>
      <div className="bg-[#F5F4F8] w-full h-full pt-16 pb-16">
        <div className="container mx-auto flex flex-col items-center w-full">
          <div className="text-4xl">Benefits of Shoko</div>
          <hr className="border-[#EC407A] border-2 w-[100px] mt-2" />

          <div className="grid grid-cols-3 gap-8 w-full mt-16">
            <div className="flex gap-4 items-center justify-center">
              <div className="my-auto">
                <span className="mdi mdi-database-outline text-5xl" />
              </div>
              <div className="flex flex-col gap-y-4">
                <div>Hash-Based Matching</div>
                <div className="text-[#535E72]">Has and compare files with AniDB for accurate episode and series identification.</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="my-auto">
                <span className="mdi mdi-file-document-edit-outline text-5xl" />
              </div>
              <div className="flex flex-col gap-y-4">
                <div>File Management</div>
                <div className="text-[#535E72]">Manage multiple, duplicate, and missing files with Shoko's built-in utilities</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="my-auto">
                <span className="mdi mdi-eye-check-outline text-5xl" />
              </div>
              <div className="flex flex-col gap-y-4">
                <div>Sync watch States</div>
                <div className="text-[#535E72]">Automatically sync and update watch states for local and supported community sites.</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="my-auto">
                <span className="mdi mdi-relation-many-to-many text-5xl" />
              </div>
              <div className="flex flex-col gap-y-4">
                <div>Metadata Support</div>
                <div className="text-[#535E72]">Acquire data and images from multiple metadata sites to improve your collections.</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="my-auto">
                <span className="mdi mdi-television text-5xl" />
              </div>
              <div className="flex flex-col gap-y-4">
                <div>Media Player Support</div>
                <div className="text-[#535E72]">Integrate with multiple media players for on-the-go access to your collection.</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="my-auto">
                <span className="mdi mdi-api text-5xl" />
              </div>
              <div className="flex flex-col gap-y-4">
                <div>Extensive API</div>
                <div className="text-[#535E72]">Expand Shoko's capabilities, customize it or bring it to an entirely new platform</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-16 pb-16">
        <div className="flex flex-col items-center gap-y-32">
          <div className="flex gap-x-16">
            <div>
              <div className="text-4xl">Collection Management Made Easy</div>
              <hr className="border-[#EC407A] border-2 w-[100px] mt-3 mb-6" />
              <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                  <span>
                    With <span className="text-[#EC407A]">Shoko</span>, the ultimate anime collection management system. As a free,
                    open-source, and cross-platform software, Shoko automates the task of managing your collection, regardless of its size
                    and location. Say goodbye to the hassle of manually inputting series information or renaming files to conform to a
                    specific format just for basic series data.
                  </span>
                  <span>
                    Shoko streamlines the process for you, ensuring that your collection is always well-organized, easily accessible across
                    multiple devices with one of our many media player plugins, and most importantly, automatically maintained.
                  </span>
                  <span className="text-[#EC407A]">
                    It's important to note that Shoko does not offer any means to download files, stream files from streaming sites, or
                    access files that are not part of your personal collection.
                  </span>
                </div>
              </div>
            </div>
            <img src="/images/home/2.png" alt="preview png 2" width={611} />
          </div>
          <div className="flex gap-x-16">
            <img src="/images/home/3.png" alt="preview png 2" width={611} />
            <div>
              <div className="text-4xl">Spend More Time Watching Anime</div>
              <hr className="border-[#EC407A] border-2 w-[100px] mt-3 mb-6" />
              <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                  <span>
                    With Shoko, you can have your anime collection up and running within just five minutes. Shoko automatically populates
                    your database with information about the various series and episodes in your collection by hashing each file for
                    comparison against AniDB's extensive database. Shoko also utilizes additional metadata sources to provide even more
                    information and integration, ensuring that your collection is complete and well-organized.
                  </span>
                  <span>Once your collection is set up, all that's left for you to do is decide which series you want to watch.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-x-16">
            <div>
              <div>Media Player Support</div>
              <hr className="border-[#EC407A] border-2 w-[100px] mt-3 mb-6" />
              <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                  <span>
                    Shoko offers more than just automated collection management. It also supports a wide range of media players, allowing
                    you to watch your collection on the device of your choice anywhere you’d like.
                  </span>
                  <div className="grid grid-cols-2 grid-rows-2 gap-y-[26px] gap-x-[100px]">
                    <div className="flex gap-x-4 items-center">
                      <img width={60} height={60} src="/images/icons/kodi.svg" alt="Kodi" />
                      <div className="flex flex-col">
                        <span>Nakamori | Shokodi</span>
                        <span>Kodi Plugin</span>
                      </div>
                    </div>
                    <div className="flex gap-x-4 items-center">
                      <img width={60} height={60} src="/images/icons/plex.svg" alt="Kodi" />
                      <div className="flex flex-col">
                        <span>Shoko Metadata | ShokoRelay</span>
                        <span>Plex Agent & Scanner</span>
                      </div>
                    </div>
                    <div className="flex gap-x-4 items-center">
                      <img width={60} height={60} src="/images/icons/media-portal.svg" alt="Kodi" />
                      <div className="flex flex-col">
                        <span>My Anime 3</span>
                        <span>MediaPortal 1 Plugin</span>
                      </div>
                    </div>
                    <div className="flex gap-x-4 items-center">
                      <img width={60} height={60} src="/images/icons/jellyfin.svg" alt="Kodi" />
                      <div className="flex flex-col">
                        <span>Shokofin</span>
                        <span>Jellyfin Plugin</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img src="/images/home/4.png" alt="preview png 2" width={611} />
          </div>
        </div>
      </div>
      <div className="bg-[#F5F4F8] w-full h-full pt-16 pb-16">
        <div className="container mx-auto flex flex-col items-center w-full">
          <div className="text-4xl">Latest News</div>
          <hr className="border-[#EC407A] border-2 w-[100px] mt-3 mb-16" />
          <div className="flex gap-x-8 mt-16">
            {sampleNews.map((x) => (
              <News key={uniqueId('news')} title={x.title} image={x.image} releaseDate={x.releasedDate} content={x.content} link={x.link} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
