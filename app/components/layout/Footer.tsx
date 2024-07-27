import { useLocation } from '@remix-run/react';
import cx from 'classnames';
import { ExternalLink, InternalLink, navRoutes } from '~/components/layout/Header';

const Footer = () => {
  const currentUrl = useLocation().pathname;

  return (
    <div
      className={cx(
        `flex h-[6.25rem] w-full items-center px-6 2xl:px-0 font-header border-shoko-border border-t font-semibold
        ${currentUrl === '/' ? 'bg-shoko-bg' : 'bg-shoko-bg-alt'}`,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] justify-between">
        <nav className="flex items-center gap-x-4">
          {navRoutes.map((route) => {
            const isExternal = route.route.startsWith('http');

            return isExternal
              ? (
                <ExternalLink
                  key={route.title}
                  title={route.title}
                  url={route.route}
                  icon={route.icon}
                />
              )
              : (
                <InternalLink
                  key={route.title}
                  title={route.title}
                  route={route.route}
                />
              );
          })}
        </nav>
        <div className="text-shoko-text-header font-medium">
          © 2016-2024 Shoko. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
