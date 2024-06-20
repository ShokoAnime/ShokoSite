export type Frontmatter = {
  image: string;
  images: { url: string, alt: string }[];
  title: string;
  name: string;
  subtitle: string;
  download: string;
  downloads: { text: string, url: string }[];
  date: string;
  anime: string;
  tags: string[];
  version: string;
} | Record<string, never>;

export type MarkdownFile = {
  filename: string;
  frontmatter: Frontmatter;
  description: string;
};

export type MarkdownListProps = {
  markdownFiles: MarkdownFile[];
  hasMore: boolean;
  totalCount: number;
  allTags?: string[];
};

export type InitialMarkdownList = {
  initialMarkdownFiles: MarkdownFile[];
  initialHasMore: boolean;
  totalCount: number;
  allTags: {
    name: string;
    count: number;
  }[];
};

export type SortCondition = 'sortByDateAscending' | 'sortByDateDescending';
