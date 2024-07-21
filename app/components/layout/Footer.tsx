import { useLocation } from '@remix-run/react';
import cx from 'classnames';
import { ExternalLink } from '../common/ExternalLink';
import { InternalLink } from '../common/InternalLink';
import { navRoutes } from './Layout.data';
const Footer = () => {
  const currentUrl = useLocation().pathname;

  return (
    <div
      className={cx(
        `flex h-[6.25rem] w-full items-center px-6 2xl:px-0 font-header border-shoko-border border-t font-semibold
        ${currentUrl === '/' ? 'bg-shoko-bg' : 'bg-shoko-bg-alt'}`,
      )}
    >
      <div className="mx-auto flex flex-row-reverse xl:flex-row w-full max-w-[1440px] justify-between">
        <nav className="hidden xl:flex items-center gap-x-4">
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
        <div className="flex flex-col lg:flex-row text-shoko-text-header font-medium">
          <span>© 2016-2024 Shoko. </span>
          <span>All Rights Reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
