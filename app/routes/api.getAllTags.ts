import { LoaderFunction } from '@remix-run/cloudflare';
import { getContentItems } from '~/lib/contentLoader';

const getUniqueTags = async (type: string): Promise<string[]> => {
  const contentItems = await getContentItems(type);

  const allTags = contentItems.flatMap(item => item.meta.tags || []);

  return [...new Set(allTags)];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'blog';

  try {
    const uniqueTags = await getUniqueTags(type);
    return { tags: uniqueTags };
  } catch (error) {
    console.error(`Error fetching tags for ${type}:`, error);
    throw new Response('Error fetching tags', { status: 500 });
  }
};
