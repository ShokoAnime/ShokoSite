import { Link, useLocation } from '@remix-run/react';
import { navRoutes } from '~/components/layout/Header';
import cx from 'classnames';

const Footer = () => {
  const currentUrl = useLocation().pathname;

  return (
    <div
      className={cx(
        `flex h-[6.25rem] w-full items-center px-6 2xl:px-0 ${currentUrl === '/' ? 'bg-shoko-bg' : 'bg-shoko-bg-alt'}`,
      )}
    >
      <div className="mx-auto flex max-w-[1440px] flex-auto items-center justify-center font-medium">
        <div className="flex flex-auto items-start justify-start gap-4">
          {navRoutes.map((route) => (
            <Link
              key={route.title}
              to={route.route}
              className="text-shoko-text-header flex gap-x-2 font-medium"
            >
              {route.icon && route.icon}
              {route.title}
            </Link>
          ))}
        </div>
        <div className="text-shoko-text-header font-medium">
          © 2016-2024 Shoko. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
