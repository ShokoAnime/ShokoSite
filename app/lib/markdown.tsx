import { Frontmatter, MarkdownFile, MarkdownListOptions, MarkdownListResult, SortCondition } from '~/types/markdown';
import { sanitizeContent } from './sanitizeContent';

const contentTypes = {
  blog: import.meta.glob<{ default: string, frontmatter: Frontmatter }>('../content/posts/*.mdx', {
    eager: true,
  }),
  blogPost: import.meta.glob<{ default: string, frontmatter: Frontmatter }>('../content/posts/*.mdx', {
    eager: true,
  }),
  downloads: import.meta.glob<{ default: string, frontmatter: Frontmatter }>('../content/downloads/*/*.mdx', {
    eager: true,
  }),
  downloadSingle: import.meta.glob<{ default: string, frontmatter: Frontmatter }>('../content/downloads/*/*.mdx', {
    eager: true,
  }),
  mediaPlayerPlugins: import.meta.glob<{ default: string, frontmatter: Frontmatter }>(
    '../content/downloads/media-player-plugins/*.mdx',
    { eager: true },
  ),
  webuiThemes: import.meta.glob<{ default: string, frontmatter: Frontmatter }>(
    '../content/downloads/webui-themes/*.mdx',
    { eager: true },
  ),
  renamerPlugins: import.meta.glob<{ default: string, frontmatter: Frontmatter }>(
    '../content/downloads/renamer-plugins/*.mdx',
    { eager: true },
  ),
  legacyApps: import.meta.glob<{ default: string, frontmatter: Frontmatter }>(
    '../content/downloads/legacy-apps/*.mdx',
    { eager: true },
  ),
};

const processedContent: Record<string, MarkdownFile[]> = {};
const allTags: Record<string, Array<{ name: string, count: number }>> = {};

for (const [type, modules] of Object.entries(contentTypes)) {
  const dontSanitize = ['blogPost', 'downloadSingle'];
  const tagCounts = new Map<string, number>();

  processedContent[type] = Object.entries(modules).map(([filename, module]) => {
    const markdownFile: MarkdownFile = {
      filename,
      frontmatter: module.frontmatter,
      description: dontSanitize.includes(type) ? module.default : sanitizeContent(module.default),
    };

    // Count tags
    (module.frontmatter.tags || []).forEach((tag: string) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });

    return markdownFile;
  });

  allTags[type] = Array.from(tagCounts.entries()).map(([name, count]) => ({ name, count }));
}

const sortFunctions: Record<SortCondition, (a: MarkdownFile, b: MarkdownFile) => number> = {
  dateAscending: (a, b) => new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime(),
  dateDescending: (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
};

export function getMarkdownList({
  type,
  page,
  pageSize,
  sortCondition,
  tags = [],
}: MarkdownListOptions): MarkdownListResult {
  if (!processedContent[type]) {
    throw new Error(`Invalid content type: ${type}`);
  }

  const filteredMarkdownFiles = tags.length > 0
    ? processedContent[type].filter(({ frontmatter }) =>
      frontmatter.tags?.length && tags.every(tag => frontmatter.tags!.includes(tag))
    )
    : processedContent[type];

  const sortedMarkdownFiles = filteredMarkdownFiles.sort(sortFunctions[sortCondition]);

  const startIndex = (page - 1) * pageSize;
  const paginatedFiles = sortedMarkdownFiles.slice(startIndex, startIndex + pageSize);

  return {
    markdownFiles: paginatedFiles,
    hasMore: startIndex + pageSize < sortedMarkdownFiles.length,
    totalCount: filteredMarkdownFiles.length,
  };
}

export function getMarkdownDetail(type: string, slug: string): MarkdownFile | null {
  if (!processedContent[type]) {
    throw new Error(`Invalid content type: ${type}`);
  }
  return processedContent[type].find((file) => file.filename.split('/').pop()?.replace('.mdx', '') === slug) || null;
}

export function getDownloadsCount(): any {
  const downloads = processedContent['downloads'];

  const shokoServer = 1;
  let mediaPlayerPlugins = 0;
  let themes = 0;
  let renamer = 0;
  let legacy = 0;

  downloads.forEach((download) => {
    download.filename.includes('media-player-plugins') && mediaPlayerPlugins++;
    download.filename.includes('themes') && themes++;
    download.filename.includes('renamer') && renamer++;
    download.filename.includes('legacy') && legacy++;
  });

  return { shokoServer, mediaPlayerPlugins, legacy, themes, renamer };
}

export function getAllTags(type: string): Array<{ name: string, count: number }> {
  if (!allTags[type]) {
    throw new Error(`Invalid content type: ${type}`);
  }
  return allTags[type];
}
