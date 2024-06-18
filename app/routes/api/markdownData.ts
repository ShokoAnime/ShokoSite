import { json } from '@remix-run/node';
import { getAllTags, markdownList } from '~/helpers/markdown';

export async function loader({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === '/api/getTags') {
      const type = url.searchParams.get('type') || 'blog';
      const allTags = await getAllTags(type);
      return json({ allTags });
    }

    if (pathname === '/api/getMarkdownList') {
      const type = url.searchParams.get('type') || 'blog';
      const offset = parseInt(url.searchParams.get('offset') || '0', 10);
      const tags = url.searchParams.getAll('tags');

      const { markdownFiles, hasMore, totalCount } = await markdownList(
        type,
        offset,
        5,
        'sortByDateDescending',
        tags,
      );

      return json({ markdownFiles, hasMore, totalCount });
    }

    return json({ error: 'Invalid API endpoint' }, 400);
  } catch (error) {
    console.error('Error in API route:', error);
    return json({ error: 'Internal Server Error' }, 500);
  }
}
