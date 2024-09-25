import { LoaderFunction } from '@remix-run/cloudflare';
import { getContentItems } from '~/lib/contentLoader';
import { ContentItem, ContentListResult, sort } from '~/types/content';

const sortFunctions: Record<sort, (a: ContentItem, b: ContentItem) => number> = {
  dateAscending: (a, b) => new Date(a.meta.date).getTime() - new Date(b.meta.date).getTime(),
  dateDescending: (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
};

const filterByTags = (items: ContentItem[], tagString: string[]): ContentItem[] => {
  if (tagString.length === 0 || tagString.includes('')) return items;

  const tags = tagString[0].split(', ').map(tag => tag.trim());

  return items.filter(({ meta }) => meta.tags?.length && tags.every(tag => meta.tags.includes(tag)));
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'blog';
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);
  const sortParam = (url.searchParams.get('sort') as sort) || 'dateDescending';
  const tags = url.searchParams.getAll('tags');

  try {
    const contentItems = await getContentItems(type);

    const filteredItems = filterByTags(contentItems, tags);
    const sortedItems = filteredItems.sort(sortFunctions[sortParam]);

    const paginatedItems = sortedItems.slice(offset, offset + limit);

    const result: ContentListResult = {
      results: paginatedItems,
      hasMore: offset + limit < sortedItems.length,
      totalCount: filteredItems.length,
    };

    return result;
  } catch (error) {
    console.error(`Error processing ${type} content:`, error);
    throw new Response('Error processing content', { status: 500 });
  }
};
