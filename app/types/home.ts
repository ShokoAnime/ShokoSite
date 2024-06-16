import React from 'react';

export type BenefitProps = {
  title: string;
  description: string;
  icon: string;
};

export type InfoSectionProps = {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  image: string;
  reverse: boolean;
};
