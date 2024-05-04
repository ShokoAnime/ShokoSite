export interface Resource {
  name: string;
  url: string;
}

export interface DownloadLink {
  name: string;
  url: string;
  version: string;
  date?: string;
}

export interface Download {
  text: string;
  links: DownloadLink[];
}

export interface DownloadProps {
  data: {
    name: string;
    description: string;
    images: string[];
    resources?: Resource[];
    downloads?: Download[];
  };
  tab?: string;
}

export interface DownloadGridProps {
  name: string;
  description: string;
  images: string[];
  resources: Resource[];
  downloads: Download[];
  tab?: string;
}
