import type { MetaFunction } from '@remix-run/node';
import Hero from '~/components/home/Hero';
import Benefits from '~/components/home/Benefits';
import InfoGroups from '~/components/home/InfoGroups';
import NewsPost from '~/components/home/NewsPost';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <>
      <Hero />
      <Benefits />
      <InfoGroups />
      <NewsPost />
    </>
  );
}
