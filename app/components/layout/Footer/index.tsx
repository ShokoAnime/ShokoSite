import { Link } from '@remix-run/react';
import { navRoutes } from '~/components/layout/Header';

interface FooterProps {
  altBackground?: boolean;
}

export const Footer = ({ altBackground = false }: FooterProps) => {
  return (
    <div
      className={`flex h-[6.25rem] w-full items-center px-6 2xl:px-0 ${
        altBackground
          ? 'bg-backgroundAlt-light dark:bg-backgroundAlt-dark'
          : 'bg-backgroundNorm-light dark:bg-backgroundNorm-dark'
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] flex-auto items-center justify-center font-medium">
        <div className="flex flex-auto items-start justify-start gap-4">
          {navRoutes.map((route) => (
            <Link
              key={route.title}
              to={route.route}
              className="flex gap-x-2  font-medium text-textHeader-light dark:text-textHeader-dark"
            >
              {route.icon && <span className={route.icon} />}
              {route.title}
            </Link>
          ))}
        </div>
        <div className="font-medium text-textHeader-light dark:text-textHeader-dark">
          © 2016-2024 Shoko. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};
