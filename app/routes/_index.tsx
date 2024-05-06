import type { MetaFunction } from '@remix-run/node';
import { Benefit, Footer, Header, Hero, InfoGroups, NewsPost } from '~/components/';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <>
      <Header />
      <Hero />
      <Benefit />
      <InfoGroups />
      <NewsPost />
      <Footer />
    </>
  );
}
