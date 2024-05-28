import React from 'react';

export type BlogPostProps = {
  description: React.JSX.Element | string;
  filename: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    image: string;
  } | Record<string, never>;
};

export type BlogPreviewProps = {
  url: string;
  tags: string[];
  date: string;
  title: string;
  image: string;
  description: React.JSX.Element | string;
  className?: string;
};

export type TagItemProps = {
  name: string;
  count: number;
};
