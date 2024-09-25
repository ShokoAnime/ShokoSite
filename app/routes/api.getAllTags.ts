import { LoaderFunction } from '@remix-run/node';
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { contentPath } from '~/lib/contentPath';

const CONTENT_DIR = path.join(process.cwd(), 'app', 'content');

const getUniqueTags = async (type: string): Promise<string[]> => {
  const contentDir = contentPath(CONTENT_DIR, type);
  const files = await fs.readdir(contentDir);

  const allTags = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async file => {
        const filePath = path.join(contentDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data: meta } = matter(fileContent);
        return meta.tags || [];
      }),
  );

  return [...new Set(allTags.flat())];
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
