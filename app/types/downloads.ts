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

export type Tag = {
  name: string;
  count: number;
};

export type CategorizedTags = {
  themes: Tag[];
  colors: Tag[];
};
