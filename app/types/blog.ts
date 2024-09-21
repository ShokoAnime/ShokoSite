import React from 'react';

export type BlogCardProps = {
  file: string;
  image: string;
  title: string;
  date: string;
  description: React.ReactNode | string;
};

export type BlogPostContributorsProps = {
  devs: string[];
};

export type BlogTagsProps = {
  tags: string[];
};
