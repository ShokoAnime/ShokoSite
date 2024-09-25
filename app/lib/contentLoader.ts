import { ContentItem } from '~/types/content';
import matter from 'gray-matter';

const contentModules = import.meta.glob('/app/content/**/*.mdx', { query: 'raw', import: 'default' });

const contentPaths: Record<string, string> = {
  blog: '/app/content/posts',
  downloads: '/app/content/downloads',
  'shoko-server': '/app/content/downloads/shoko-server',
  'media-player-plugins': '/app/content/downloads/media-player-plugins',
  'webui-themes': '/app/content/downloads/webui-themes',
  'renamer-plugins': '/app/content/downloads/renamer-plugins',
  'legacy-apps': '/app/content/downloads/legacy-apps',
};

export async function getContentItems(type: string): Promise<ContentItem[]> {
  if (!(type in contentPaths)) {
    throw new Error(`Invalid content type: ${type}`);
  }

  const basePath = contentPaths[type];

  const contentPromises = Object.entries(contentModules)
    .filter(([path]) => path.startsWith(basePath))
    .map(async ([path, importFn]) => {
      const rawContent = await importFn();
      // @ts-expect-error - Not an issue.
      const { data: meta, content: mdxContent } = matter(rawContent);

      return {
        filename: path.split('/').pop() || '',
        meta,
        content: mdxContent,
      };
    });

  return Promise.all(contentPromises);
}
