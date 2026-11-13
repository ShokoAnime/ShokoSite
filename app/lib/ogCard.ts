import { convertToProperName } from '~/lib/convertToProperName';
import { sanitizeContent } from '~/lib/sanitizeContent';
import type { BlogMeta, ContentItem, DownloadMeta } from '~/types/content';

/**
 * Everything a social preview image (`/api/ogImage`) shows. Pages never put
 * this text in the image URL: they link to the card by `type` + `id`, and the
 * image route rebuilds the same card from site content with these builders.
 */
export type OgCard = {
  title: string;
  summary: string;
  pageUrl: string;
  background: string;
  date?: string;
  version?: string;
};

export type OgType = 'page' | 'blog' | 'download' | 'category';

export const siteOrigin = 'https://shokoanime.com';

const banner = (file: string) => `${siteOrigin}/images/banners/${file}`;

export const pageCards: Record<string, OgCard> = {
  home: {
    title: 'Shoko | Anime Management System',
    summary:
      'The all-in-one, feature-packed, cross-platform anime management system with support for Plex, Jellyfin, and Kodi. Let Shoko handle your collection setup and organization so you can focus on what really matters—choosing your next anime to watch.',
    pageUrl: `${siteOrigin}/`,
    background: banner('main-banner.jpg'),
  },
  blog: {
    title: 'Shoko Blog',
    summary: 'Stay informed with the latest news about Shoko\'s development, third-party plugins, and other relevant topics.',
    pageUrl: `${siteOrigin}/blog`,
    background: banner('banner-2.jpg'),
  },
  about: {
    title: 'About Shoko',
    summary: 'Spend some time learning about Shoko\'s development over the years.',
    pageUrl: `${siteOrigin}/about`,
    background: banner('banner-8.jpg'),
  },
  contributors: {
    title: 'Contributors',
    summary:
      'From the Shoko team itself to our everyday users, everyone listed below has contributed to making Shoko better.',
    pageUrl: `${siteOrigin}/contributors`,
    background: banner('banner-11.jpg'),
  },
  downloads: {
    title: 'Downloads',
    summary: 'Browse through selection of programs, plugins, Web UI Themes and other tools available in the Shoko Suite.',
    pageUrl: `${siteOrigin}/downloads`,
    background: banner('banner-7.jpg'),
  },
};

/** A downloads category listing, e.g. `/downloads/webui-themes`. */
export const categoryCard = (category: string): OgCard => ({
  title: convertToProperName(category),
  summary: `Browse and download ${category} for Shoko Anime.`,
  pageUrl: `${siteOrigin}/downloads/${category}`,
  background: banner('banner-10.jpg'),
});

export const blogCard = (item: ContentItem<BlogMeta>): OgCard => ({
  title: item.meta.title,
  summary: sanitizeContent(item.content),
  pageUrl: `${siteOrigin}/blog/${item.filename.replace('.mdx', '')}`,
  background: `${siteOrigin}/images/blog/${item.meta.image}`,
  date: String(item.meta.date),
});

/** Same id rule as the download page: `/downloads/shoko-server` has type === filename. */
export const downloadId = (type: string, item: ContentItem<DownloadMeta>) =>
  `${type}/${item.filename.replace('.mdx', '')}`;

export const downloadCard = (type: string, item: ContentItem<DownloadMeta>): OgCard => {
  const filename = item.filename.replace('.mdx', '');
  return {
    title: item.meta.name,
    summary: sanitizeContent(item.content),
    pageUrl: `${siteOrigin}/downloads/${type === filename ? filename : `${type}/${filename}`}`,
    background: `${siteOrigin}${item.meta.images[0].url}`,
    date: item.meta.date,
    version: item.meta.version,
  };
};

/**
 * A short, stable fingerprint of a card. Not a security measure: it only
 * changes the image URL when the card changes, so crawlers and the edge cache
 * fetch a fresh image after an edit. (Plain 32-bit FNV-1a, so it can also run
 * synchronously in the browser during client-side navigation.)
 */
export const ogCardHash = (card: OgCard): string => {
  const text = JSON.stringify([
    card.title,
    card.summary,
    card.pageUrl,
    card.background,
    card.date ?? '',
    card.version ?? '',
  ]);
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
};

export const ogImageUrl = (type: OgType, id: string, card: OgCard): string =>
  `${siteOrigin}/api/ogImage?type=${type}&id=${encodeURIComponent(id)}&v=${ogCardHash(card)}`;
