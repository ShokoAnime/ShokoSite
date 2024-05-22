type ImagesType = {
  url: string;
  alt: string;
};

type ResourcesType = {
  name: 'Github' | 'Logs' | 'Changelog' | 'Discord' | 'Docs';
  url: string;
};

type DownloadsType = {
  text: string;
  links: {
    name: string;
    version: string;
    url: string;
    date?: string;
  }[];
};

export type DownloadsDataType = {
  name: string;
  description: string;
  images: ImagesType[];
  resources: ResourcesType[];
  downloads: DownloadsType[];
};
