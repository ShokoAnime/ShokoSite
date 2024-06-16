import React from 'react';

export type NavRouteProps = {
  title: string;
  route: string;
  icon?: React.ReactNode;
};

export type InternalLinksProps = {
  title: string;
  route: string;
  isActive?: boolean;
};

export type ExternalLinksProps = {
  title: string;
  url: string;
  icon?: React.ReactNode;
};
