import type { MetaFunction } from '@remix-run/node';
import Hero from '~/components/home/Hero';
import Benefits from '~/components/home/Benefits';
import InfoGroups from '~/components/home/InfoGroups';
import LatestNews from '~/components/home/LatestNews';

export const meta: MetaFunction = () => {
  return [
    { title: 'Shoko | Anime Management System' },
    { name: 'description', content: 'The All-in-One Cross-Platform Anime Management System Built For You' },
  ];
};

export default function Index() {
  return (
    <div>
      <Hero />
      <Benefits />
      <InfoGroups />
      <LatestNews />
    </div>
  );
}
