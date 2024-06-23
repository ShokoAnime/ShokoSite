import React from 'react';
import { MarkdownFile } from '~/types/markdown';

export type DownloadsIndexProps = {
  programs: number;
  themes: number;
  renamers: number;
};

export type DownloadCategories = {
  title: string;
  description: string;
  icon: string;
  link: string;
};

export type PlatformData = {
  text: string;
  links: {
    name: string;
    url: string;
  }[];
};

export type DownloadItem = {
  filename: string;
  frontmatter: {
    name: string;
    date: string;
    version: string;
    images: {
      url: string;
      alt: string;
    }[];
    resources: {
      name: string;
      url: string;
    }[];
    downloads: PlatformData[];
    author: string;
    tags: string[];
  };
  description: React.ReactNode;
};

export type IconName = {
  [key: string]: React.ReactNode | string;
  discord: React.ReactNode;
  github: React.ReactNode;
  changelog: string;
  docs: string;
};

export type DownloadGridProps = {
  data: MarkdownFile[];
  tagClicked: boolean;
  setTagClicked: (tagClicked: boolean) => void;
  selectedTags: string[];
  type: string;
};
