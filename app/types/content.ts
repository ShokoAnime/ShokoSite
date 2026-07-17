export type DownloadMeta = {
  title: string;
  name: string;
  subtitle: string;
  images: { url: string, alt: string }[];
  downloads: {
    text: string;
    links: { name: string; url: string }[];
  }[];
  version: string;
  date: string;
  resources?: { name: string, url: string }[];
  tags?: string[];
  author?: string;
  devs?: string[];
  githubRepository?: string;
};

export type BlogMeta = {
  title: string;
  image: string;
  date: string;
  tags: string[];
  devs?: string[];
};

export type Meta = DownloadMeta | BlogMeta;

export type ContentItem<TMeta = Meta> = {
  filename: string;
  meta: TMeta;
  content: string;
};

export interface ContentListResult {
  results: ContentItem[];
  hasMore: boolean;
  totalCount: number;
}

export type sort = 'dateAscending' | 'dateDescending';
