import { LoaderFunction } from '@remix-run/cloudflare';
import { getContentItems } from '~/lib/contentLoader';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const filename = url.searchParams.get('filename');

  if (!type || !filename) {
    throw new Response('Missing type or post name', { status: 400 });
  }

  try {
    const contentItems = await getContentItems(type);
    const requestedItem = contentItems.find(item => item.filename === `${filename}.mdx`);

    if (!requestedItem) {
      throw new Response('File not found', { status: 404 });
    }

    return requestedItem;
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error(`Error processing ${type}/${filename} content:`, error);
    throw new Response('Error processing content', { status: 500 });
  }
};
