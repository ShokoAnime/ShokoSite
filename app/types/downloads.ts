import React from 'react';

export type DownloadListItemProps = {
  name: string;
  description: string;
  count: number;
  link: string;
};

export type HeaderBuilderProps = {
  title: string;
  children?: React.ReactNode;
};

export type IconNameProps = {
  [key: string]: React.JSX.Element;
};

export type CategorizedTags = {
  themes: string[];
  colors: string[];
};

export type DownloadCounts = {
  legacy: number;
  mediaPlayerPlugins: number;
  renamer: number;
  themes: number;
  shokoServer: number;
};
