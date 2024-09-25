import { LoaderFunction } from '@remix-run/node';
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { ContentItem } from '~/types/content';
import { contentPath } from '~/lib/contentPath';

const CONTENT_DIR = path.join(process.cwd(), 'app', 'content');

const readContentFile = async (filePath: string): Promise<ContentItem> => {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data: meta, content } = matter(fileContent);
  return { filename: path.basename(filePath), meta, content };
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const filename = url.searchParams.get('filename');

  if (!type || !filename) {
    throw new Response('Missing type or post name', { status: 400 });
  }

  try {
    const contentDir = contentPath(CONTENT_DIR, type);
    const filePath = path.join(contentDir, `${filename}.mdx`);

    try {
      await fs.access(filePath);
    } catch (error) {
      new Response('File not found', { status: 404 });
    }

    return await readContentFile(filePath);
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error(`Error processing ${type}/${filename} content:`, error);
    throw new Response('Error processing content', { status: 500 });
  }
};
