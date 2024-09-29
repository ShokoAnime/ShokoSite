import type { MetaFunction } from '@remix-run/cloudflare';
import Hero from '~/components/home/Hero';
import Features from '~/components/home/Features';
import Divider from '~/components/layout/Divider';
import InfoGroups from '~/components/home/InfoGroups';
import WatchAnywhere from '~/components/home/WatchAnywhere';
import LatestNews from '~/components/home/LatestNews';

export const meta: MetaFunction = () => {
  const pageTitle = 'Shoko | Anime Management System';
  const pageDescription =
    'The all-in-one, feature-packed, cross-platform anime management system with support for Plex, Jellyfin, Kodi, and MediaPortal. Let Shoko handle your collection setup and organization so you can focus on what really matters—choosing your next anime to watch.';
  const pageImage = `https://shokoanime.com/images/banners/main-banner.jpg`;
  const pageURL = 'https://shokoanime.com/';

  const ogImageUrl = `https://shokoanime.com/api/ogImage?title=${encodeURIComponent(`${pageTitle}`)}&summary=${
    encodeURIComponent(pageDescription)
  }&pageUrl=${encodeURIComponent(pageURL)}&backgroundImage=${encodeURIComponent(`${pageImage}`)}`;

  return [
    { title: pageTitle },
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:type', content: 'article' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: pageTitle },
    { property: 'twitter:description', content: pageDescription },
    { property: 'twitter:image', content: ogImageUrl },
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
