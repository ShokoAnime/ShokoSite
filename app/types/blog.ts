import React from 'react';
import { MarkdownFile } from '~/types/markdown';

export type BlogFilterProps = {
  availableTags: {
    name: string;
    count: number;
  }[];
  tagCount: number;
  selectedTags: string[];
  setSelectedTags: (selectedTags: string[]) => void;
  setTagClicked: (tagClicked: boolean) => void;
};

export type BlogListProps = {
  data: MarkdownFile[];
  tagClicked: boolean;
  setTagClicked: (tagClicked: boolean) => void;
  selectedTags: string[];
};

export type BlogDetail = {
  filename: string;
  frontmatter: {
    title: string;
    quick: string;
    image: string;
    date: string;
    anime: string;
    tags: string[];
    devs?: string[];
    download?: {
      title: string;
      link: string;
    };
    changelog?: {
      title: string;
      link: string;
    };
  } | Record<string, never>;
  description: React.ReactNode | string;
};
