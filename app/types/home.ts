import React from 'react';

export type SingleFeatureProps = {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  descriptionLink?: {
    link: string;
    text: string;
  };
};

export type SingleInfoProps = {
  title: string;
  subtitle: string;
  image: string;
  description: React.ReactNode;
  reverse?: boolean;
};

export type SingleMediaPlayerProps = {
  program: string;
  name: string;
  type: string;
  link: string;
};
