import React from 'react';

export type ButtonProps = {
  buttonType: 'primary' | 'secondary' | 'outline' | 'round' | 'text';
  children: React.ReactNode;
  className?: string;
  id?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  to?: string;
  href?: string;
};

export type MultiSelectDropdownProps = {
  title: string;
  icon: React.ReactNode;
  options: string[];
  setSelectedOptions: (selected: string[]) => void;
};

export type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  zoom?: boolean;
};

export type FlexContainerProps = {
  children: React.ReactNode;
};
