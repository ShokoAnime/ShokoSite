import { renderToStaticMarkup } from 'react-dom/server';
import { Frontmatter, MarkdownFile, MarkdownListProps, SortCondition } from '~/types/markdown';

// Get all markdown files from the content directory.
const getMarkdownModules = (type: string) => {
  switch (type) {
    case 'blog':
      return import.meta.glob<{ default: string, frontmatter: Frontmatter }>(
        '../content/posts/*.mdx',
        { eager: false },
      );
    case 'downloads':
      return import.meta.glob<{ default: string, frontmatter: Record<string, never> }>(
        '../content/downloads/*/*.mdx',
        { eager: false },
      );
    case 'media-player-plugins':
      return import.meta.glob<{ default: string, frontmatter: Record<string, never> }>(
        '../content/downloads/media-player-plugins/*.mdx',
        { eager: false },
      );
    case 'renamer-plugins':
      return import.meta.glob<{ default: string, frontmatter: Record<string, never> }>(
        '../content/downloads/renamer-plugins/*.mdx',
        { eager: false },
      );
    case 'webui-themes':
      return import.meta.glob<{ default: string, frontmatter: Record<string, never> }>(
        '../content/downloads/webui-themes/*.mdx',
        { eager: false },
      );
    case 'legacy':
      return import.meta.glob<{ default: string, frontmatter: Record<string, never> }>(
        '../content/downloads/legacy/*.mdx',
        { eager: false },
      );
    default:
      return {};
  }
};

// Get all unique tags and their counts from markdown files.
export const getAllTags = async (type: string): Promise<Array<{ name: string, count: number }>> => {
  const modules = getMarkdownModules(type);
  const filenames = Object.keys(modules);

  const tagCounts = new Map<string, number>();

  await Promise.all(
    filenames.map(async (filename) => {
      const module = await modules[filename]();
      const tags = module.frontmatter.tags || [];
      (tags as string[]).forEach((tag: string) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    }),
  );

  return Array.from(tagCounts.entries()).map(([tag, count]) => ({ name: tag, count }));
};

// Sort markdown files ascending based on the date in the frontmatter.
const sortByDateAscending = (a: MarkdownFile, b: MarkdownFile) => {
  return new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime();
};

// Sort markdown files descending based on the date in the frontmatter.
const sortByDateDescending = (a: MarkdownFile, b: MarkdownFile) => {
  return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
};

// Map sort conditions to their respective sort functions.
const sortMap = {
  sortByDateAscending: sortByDateAscending,
  sortByDateDescending: sortByDateDescending,
};

// Clean content by removing HTML tags, extra spaces and trimming for description.
const sanitizeContent = (MDContent: string) => {
  const renderedContent = renderToStaticMarkup(<MDContent />);
  const cleanedContent = renderedContent.replace(/<[^>]*>|&[^;]+;/g, '');
  const trimmedContent = cleanedContent.replace(/\s+/g, ' ').trim();

  // Get the first 200 words
  const wordsArray = trimmedContent.split(' ');
  return wordsArray.slice(0, 100).join(' ');
};

// Get a list of markdown files based on the type.
export const markdownList = async (
  type: string,
  offset: number,
  count: number,
  sortCondition: SortCondition = 'sortByDateDescending',
  tags: string[] = [],
): Promise<MarkdownListProps> => {
  const modules = getMarkdownModules(type);
  const filenames = Object.keys(modules);

  // Sort filenames based on the sort condition
  const allMarkdownFiles = await Promise.all(
    filenames.map(async (filename) => {
      const module = await modules[filename]();
      const MDContent = module.default;
      const sanitizedContent = sanitizeContent(MDContent);

      return {
        filename,
        frontmatter: module.frontmatter,
        description: sanitizedContent,
      };
    }),
  );

  // Filter files based on tags
  let filteredMarkdownFiles: MarkdownFile[];

  if (tags.length > 0) {
    filteredMarkdownFiles = allMarkdownFiles.filter(({ frontmatter }) =>
      frontmatter.tags?.length && tags.every(tag => frontmatter.tags!.includes(tag))
    );
  } else {
    filteredMarkdownFiles = allMarkdownFiles;
  }

  // Sort the markdown files
  const sortedMarkdownFiles = filteredMarkdownFiles.sort(sortMap[sortCondition]);

  // Slice the sorted files to get only the requested amount
  const paginatedFiles = sortedMarkdownFiles.slice(offset, offset + count);

  return {
    markdownFiles: paginatedFiles,
    hasMore: offset + count < sortedMarkdownFiles.length,
    totalCount: filteredMarkdownFiles.length,
  };
};

export const markdownDetail = async (path: string) => {
  const pathParts = path.split('/').filter(Boolean);

  if (pathParts.length === 3) {
    pathParts.shift();
  }

  const type = pathParts[0];
  const fileName = pathParts[1];
  const modules = getMarkdownModules(type);

  const files = await Promise.all(
    Object.keys(modules).map(async (filename: string) => {
      const module = await modules[filename]();
      const MDContent = module.default;

      return {
        filename: filename.split('/').pop()?.replace('.mdx', '') || '',
        frontmatter: module.frontmatter,
        description: <MDContent />,
      };
    }),
  );

  return files.find((file) => file.filename === fileName) || null;
};
