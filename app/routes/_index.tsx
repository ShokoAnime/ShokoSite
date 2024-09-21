import type { MetaFunction } from '@remix-run/cloudflare';
import Hero from '~/components/home/Hero';
import Features from '~/components/home/Features';
import Divider from '~/components/layout/Divider';
import InfoGroups from '~/components/home/InfoGroups';
import WatchAnywhere from '~/components/home/WatchAnywhere';
import LatestNews from '~/components/home/LatestNews';

export const meta: MetaFunction = () => {
  return [
    { title: 'Shoko | Anime Management System' },
    { name: 'description', content: 'The All-in-One Cross-Platform Anime Management System Built For You.' },
  ];
};

export default function Index() {
  return (
    <div className="my-24 flex flex-col gap-24">
      <Hero />
      <Features />
      <Divider />
      <InfoGroups />
      <Divider />
      <WatchAnywhere />
      <Divider />
      <LatestNews />
    </div>
  );
}
