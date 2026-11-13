import type { MetaFunction } from 'react-router';
import { ogImageUrl, pageCards } from '~/lib/ogCard';
import Hero from '~/components/home/Hero';
import Features from '~/components/home/Features';
import Divider from '~/components/layout/Divider';
import InfoGroups from '~/components/home/InfoGroups';
import WatchAnywhere from '~/components/home/WatchAnywhere';
import LatestNews from '~/components/home/LatestNews';

export const meta: MetaFunction = () => {
  const card = pageCards.home;
  const pageTitle = card.title;
  const pageDescription = card.summary;
  const ogImage = ogImageUrl('page', 'home', card);

  return [
    { title: pageTitle },
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: ogImage },
    { property: 'og:type', content: 'article' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: pageTitle },
    { property: 'twitter:description', content: pageDescription },
    { property: 'twitter:image', content: ogImage },
  ];
};

export default function Index() {
  return (
    <div className="my-8 flex flex-col gap-12 lg:my-24 lg:gap-24">
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
