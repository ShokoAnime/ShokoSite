import { LoaderFunction } from '@remix-run/node';
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { ContentItem, ContentListResult, sort } from '~/types/content';
import { contentPath } from '~/lib/contentPath';

const CONTENT_DIR = path.join(process.cwd(), 'app', 'content');

const sortFunctions: Record<sort, (a: ContentItem, b: ContentItem) => number> = {
  dateAscending: (a, b) => new Date(a.meta.date).getTime() - new Date(b.meta.date).getTime(),
  dateDescending: (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
};

const readContentFile = async (filePath: string): Promise<ContentItem> => {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data: meta, content } = matter(fileContent);
  return { filename: path.basename(filePath), meta, content };
};

const filterByTags = (items: ContentItem[], tagString: string[]): ContentItem[] => {
  if (tagString.length === 0) return items;

  const tags = tagString[0].split(', ').map(tag => tag.trim());

  return items.filter(({ meta }) => meta.tags?.length && tags.every(tag => meta.tags.includes(tag)));
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'blog';
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);
  const sort = (url.searchParams.get('sort') as sort) || 'dateDescending';
  const tags = url.searchParams.getAll('tags');

  console.log(tags);

  try {
    const contentDir = contentPath(CONTENT_DIR, type);
    const files = await fs.readdir(contentDir);

    const contentItems: ContentItem[] = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(file => readContentFile(path.join(contentDir, file))),
    );

    const filteredItems = filterByTags(contentItems, tags);
    const sortedItems = filteredItems.sort(sortFunctions[sort]);

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
