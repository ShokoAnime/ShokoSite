import React, { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import PageHero from '~/components/layout/PageHero';
import { DownloadCounts, DownloadListItemProps } from '~/types/downloads';
import { Info } from 'lucide-react';
import { useBackground } from '~/hooks/useBackground';
import { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => {
  const pageTitle = 'Downloads';
  const pageDescription =
    'Browse through selection of programs, plugins, Web UI Themes and other tools available in the Shoko Suite.';
  const pageImage = `https://shokoanime.com/images/banners/banner-7.jpg`;
  const pageURL = 'https://shokoanime.com/downloads';

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

const DownloadListItem = ({ name, description, count, link }: DownloadListItemProps) => {
  const pluralize = (word: string, count: number) => `${word}${count === 1 ? '' : 's'}`;

  const CountDisplay = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2">
      <div className="text-shoko-highlight">{count}</div>
      <div>{text}</div>
    </div>
  );

  const countConfigs: Record<string, () => React.JSX.Element> = {
    'Shoko Server': () => (
      <div className="flex w-fit items-center gap-2 rounded border border-shoko-highlight p-3">
        <Info />
        <div className="font-semibold">Required</div>
      </div>
    ),
    'Media Player Plugins': () => <CountDisplay text={`${pluralize('Plugin', count)} Available`} />,
    'Web UI Themes': () => <CountDisplay text={`${pluralize('Theme', count)} Available`} />,
    'Renamer Plugins': () => <CountDisplay text={`${pluralize('Renamer', count)} Available`} />,
    'Legacy Apps': () => <CountDisplay text={`${pluralize('App', count)} Listed`} />,
  };

  const CountBuilder = () => {
    const CountComponent = countConfigs[name] || (() => <CountDisplay text={pluralize('Item', count)} />);
    return <CountComponent />;
  };

  return (
    <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:text-start">
      <div className="flex w-full justify-center font-semibold lg:max-w-[200px] lg:justify-start xl:max-w-[278px]">
        <CountBuilder />
      </div>
      <div>
        <div className="font-header text-shoko-20 font-bold">{name}</div>
        <div className="text-shoko-text-75">{description}</div>
      </div>
      <Link className="text-center font-semibold text-shoko-link lg:ml-auto lg:text-start" to={link}>
        {`Download ${name} →`}
      </Link>
    </div>
  );
};

export default function Downloads() {
  const [downloadsList, setDownloadsList] = useState<{ [key: string]: number }>({});
  const { resetBackground } = useBackground();

  useEffect(() => {
    const getCounts = async () => {
      try {
        const response = await fetch(`/api/getDownloadCounts`);
        const data = await response.json() as DownloadCounts;
        setDownloadsList(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    resetBackground;
    getCounts();
  }, []);

  return (
    <>
      <PageHero
        title="Downloads"
        description="Browse through selection of programs, plugins, Web UI Themes and other tools available in the Shoko Suite."
      />

      <div className="my-16 flex flex-col gap-6">
        <DownloadListItem
          name="Shoko Server"
          description="The main program, required for everything else to properly work. "
          count={downloadsList['shokoServer']}
          link="/downloads/shoko-server"
        />
        <DownloadListItem
          name="Media Player Plugins"
          description="Plugins to get Shoko working with various media players programs."
          count={downloadsList['mediaPlayerPlugins']}
          link="/downloads/media-player-plugins"
        />
        {/*<DownloadListItem*/}
        {/*  name="Web UI Themes"*/}
        {/*  description="Browse our collection of user submitted themes to enhance the Web UI. "*/}
        {/*  count={downloadsList['themes']}*/}
        {/*  link="/downloads/webui-themes"*/}
        {/*/>*/}
        {/*<DownloadListItem*/}
        {/*  name="Renamer Plugins"*/}
        {/*  description="Plugins to replace Shoko’s built-in renamer functionality"*/}
        {/*  count={downloadsList['renamer']}*/}
        {/*  link="/downloads/renamer-plugins"*/}
        {/*/>*/}
        <DownloadListItem
          name="Legacy Apps"
          description="Deprecated apps that are listed for archival purposes only."
          count={downloadsList['legacy']}
          link="/downloads/legacy-apps"
        />
      </div>
    </>
  );
}
