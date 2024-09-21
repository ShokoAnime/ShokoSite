import { MarkdownFile, MarkdownListOptions, MarkdownListResult, SortCondition } from '~/types/markdown';
import { loadMarkdownFiles } from '~/helpers/markdownLoader';

const markdownCache: Record<string, MarkdownFile[]> = {};

async function getOrLoadMarkdownFiles(type: string): Promise<MarkdownFile[]> {
  if (!markdownCache[type]) {
    markdownCache[type] = await loadMarkdownFiles(type);
  }
  return markdownCache[type];
}

const sortFunctions: Record<SortCondition, (a: MarkdownFile, b: MarkdownFile) => number> = {
  dateAscending: (a, b) => new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime(),
  dateDescending: (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
};

export async function getMarkdownList({
  type,
  page,
  pageSize,
  sortCondition,
  tags = [],
}: MarkdownListOptions): Promise<MarkdownListResult> {
  const allMarkdownFiles = await getOrLoadMarkdownFiles(type);

  const filteredMarkdownFiles = tags.length > 0
    ? allMarkdownFiles.filter(({ frontmatter }) =>
      frontmatter.tags?.length && tags.every(tag => frontmatter.tags!.includes(tag))
    )
    : allMarkdownFiles;

  const sortedMarkdownFiles = filteredMarkdownFiles.sort(sortFunctions[sortCondition]);

  const startIndex = (page - 1) * pageSize;
  const paginatedFiles = sortedMarkdownFiles.slice(startIndex, startIndex + pageSize);

  return {
    markdownFiles: paginatedFiles,
    hasMore: startIndex + pageSize < sortedMarkdownFiles.length,
    totalCount: filteredMarkdownFiles.length,
  };
}

export async function getMarkdownDetail(type: string, slug: string): Promise<MarkdownFile | null> {
  const files = await getOrLoadMarkdownFiles(type);
  return files.find((file) => file.filename.split('/').pop()?.replace('.mdx', '') === slug) || null;
}

export async function getDownloadsCount(): Promise<any> {
  const downloads = await getOrLoadMarkdownFiles('downloads');

  const shokoServer = 1;
  let mediaPlayerPlugins = 0;
  let themes = 0;
  let renamer = 0;
  let legacy = 0;

  downloads.map((download) => {
    download.filename.includes('media-player-plugins') && mediaPlayerPlugins++;
    download.filename.includes('themes') && themes++;
    download.filename.includes('renamer') && renamer++;
    download.filename.includes('legacy') && legacy++;
  });

  return { shokoServer, mediaPlayerPlugins, legacy, themes, renamer };
}

export async function getAllTags(type: string): Promise<Array<{ name: string, count: number }>> {
  const files = await getOrLoadMarkdownFiles(type);
  const tagCounts = new Map<string, number>();

  files.forEach(({ frontmatter }) => {
    (frontmatter.tags || []).forEach((tag: string) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries()).map(([name, count]) => ({ name, count }));
}
