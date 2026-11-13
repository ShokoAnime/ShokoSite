import { getContentItems, isContentType } from '~/lib/contentLoader';
import { applyLatestRelease } from '~/lib/githubRelease';
import { blogCard, categoryCard, downloadCard, type OgCard, type OgType, pageCards } from '~/lib/ogCard';
import type { BlogMeta, ContentItem, DownloadMeta } from '~/types/content';

/** Rebuilds the card for a `type` + `id` from site content; `null` if there is none. */
export async function resolveOgCard(type: string, id: string, baseUrl: string): Promise<OgCard | null> {
  switch (type as OgType) {
    case 'page':
      return Object.hasOwn(pageCards, id) ? pageCards[id] : null;

    case 'category':
      return isContentType(id) && id !== 'blog' && id !== 'downloads' ? categoryCard(id) : null;

    case 'blog': {
      const items = await getContentItems('blog') as ContentItem<BlogMeta>[];
      const item = items.find(i => i.filename === `${id}.mdx`);
      return item ? blogCard(item) : null;
    }

    case 'download': {
      const [category, filename, ...rest] = id.split('/');
      if (!category || !filename || rest.length || !isContentType(category) || category === 'blog' || category === 'downloads') return null;

      const items = await getContentItems(category) as ContentItem<DownloadMeta>[];
      const item = items.find(i => i.filename === `${filename}.mdx`);
      if (!item) return null;

      await applyLatestRelease(item.meta, baseUrl).catch(() => undefined);
      return downloadCard(category, item);
    }

    default:
      return null;
  }
}
