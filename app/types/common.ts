import React from 'react';

export type ButtonProps = {
  buttonType: 'primary' | 'outline' | 'round' | 'text';
  children: React.ReactNode;
  className?: string;
  id?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  to?: string;
};

export type ImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export type Option = {
  name: string;
  count: number;
};

export type MultiSelectDropdownProps = {
  title: string;
  icon: React.ReactNode;
  options: Option[];
  setSelectedOptions: (selected: string[]) => void;
};
