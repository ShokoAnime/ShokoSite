type ResourcesType = {
  name: 'Github' | 'Logs' | 'Changelog' | 'Discord';
  url: string;
};

type DownloadsType = {
  text: string;
  links: {
    name: string;
    version: string;
    date: string;
    url: string;
  }[];
};

export type DownloadsDataType = {
  name: string;
  description: string;
  images: string[];
  resources: ResourcesType[];
  downloads: DownloadsType[];
};
