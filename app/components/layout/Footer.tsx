import { useLocation } from '@remix-run/react';
import cx from 'classnames';
import { ExternalLink, InternalLink, navRoutes } from '~/components/layout/Header';

const Footer = () => {
  const currentUrl = useLocation().pathname;

  return (
    <div
      className={cx(
        `flex h-[6.25rem] w-full items-center border-t border-shoko-border px-6 font-header font-semibold 2xl:px-0
        ${currentUrl === '/' ? 'bg-shoko-bg' : 'bg-shoko-bg-alt'}`,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] justify-center xl:justify-between">
        <nav className="hidden items-center gap-x-4 xl:flex">
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
        <div className="flex w-44 text-pretty text-center font-medium text-shoko-text-header sm:w-fit">
          © 2016-2024 Shoko. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
