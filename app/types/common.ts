import React from 'react';

export type ButtonProps = {
  buttonType: 'primary' | 'secondary' | 'outline' | 'circle' | 'text' | 'breadcrumb' | 'download';
  children: React.ReactNode;
  className?: string;
  id?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  to?: string;
};

export type HighLightHeaderProps = {
  title: string;
  type: string;
  subtitle?: string | React.ReactNode;
  center?: boolean;
  opacity?: number;
};

export type ImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export type HistorySectionProps = {
  title: string;
  years: string;
  programs: string[];
  children: React.ReactNode;
};

export type ScrollWrapperProps = {
  children: React.ReactNode;
};
