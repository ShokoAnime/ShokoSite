import { ReactNode } from 'react';

export type ContributorsProps = {
  name: string;
  avatar_url: string;
  url: string;
  join_date?: string;
  role?: string;
  honorable?: boolean;
};

export type ContributorsGroupProps = {
  title: string;
  description: string | ReactNode;
  type: 'staff' | 'honorable' | 'contributors';
  data: ContributorsProps[];
};

export type UserCardProps = {
  type: 'contributors' | 'downloads';
  name: string;
  image: string;
  link: string;
  role?: string;
  joinDate?: string;
  className?: string;
};
