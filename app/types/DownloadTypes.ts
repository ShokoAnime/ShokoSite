import React from 'react';

export type DownloadListProps = {
  content: DownloadSingleProps[];
};

export type DownloadSingleProps = {
  description: React.JSX.Element | string;
  filename: string;
  frontmatter: {
    name: string;
    date: string;
    images: {
      url: string;
      alt: string;
    }[];
    resources: {
      name: string;
      url: string;
    }[];
    downloads: {
      text: string;
      links: {
        name: string;
        version: string;
        date: string;
        url: string;
      }[];
    }[];
    tags?: string[];
  } | Record<string, never>;
};
