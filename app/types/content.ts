export type Meta = {
  image?: string;
  images?: { url: string, alt: string }[];
  title?: string;
  name?: string;
  subtitle?: string;
  download?: string;
  downloads?: {
    text: string;
    links: {
      name: string;
      url: string;
    }[];
  }[];
  resources?: { name: string, url: string }[];
  date?: string;
  anime?: string;
  tags?: string[];
  version?: string;
  author?: string;
  devs?: string[];
  githubRepository?: string;
};

export type ContentItem = {
  filename: string;
  meta: Meta;
  content: string;
};

export interface ContentListResult {
  results: ContentItem[];
  hasMore: boolean;
  totalCount: number;
}

export type sort = 'dateAscending' | 'dateDescending';
