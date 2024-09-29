import React from 'react';

export type NavRouteProps = {
  title: string;
  route: string;
  icon?: React.ReactNode;
};

export type NavRouteBuilderProps = {
  currentURL: string;
  className?: string;
  onClick?: () => void;
};

export type InternalLinksProps = {
  title: string;
  route: string;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export type ExternalLinksProps = {
  title: string;
  url: string;
  icon?: React.ReactNode;
};

export type MobileMenuProps = {
  setShowMobileMenu: (val: boolean) => void;
};

export type PageHeroProps = {
  title: string;
  description?: string;
  date?: string;
};

export type BreadcrumbProps = {
  segment: string;
  index: number;
};
