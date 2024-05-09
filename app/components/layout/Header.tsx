import React from 'react';
import { Link, useLocation } from '@remix-run/react';
import cx from 'classnames';
import { useTheme } from '~/context/ThemeContext';
import { mdiMagnify, mdiThemeLightDark } from '@mdi/js';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';

type NavRoute = {
  title: string;
  route: string;
  icon?: React.ReactNode;
};

export const navRoutes: NavRoute[] = [
  { title: 'About', route: '/about' },
  { title: 'Blog', route: '/blog' },
  { title: 'Changelog', route: 'https://docs.shokoanime.com/changelog/shoko-server' },
  { title: 'Contributors', route: '/contributors' },
  { title: 'Downloads', route: '/downloads' },
  { title: 'Documentation', route: 'https://docs.shokoanime.com/' },
  { title: 'Github', route: 'https://github.com', icon: <FaGithub size={24} /> },
  { title: 'Discord', route: 'https://discord.com', icon: <FaDiscord size={24} /> },
];

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const currentURL = location.pathname;

  return (
    <div className="bg-shoko-bg-alt text-shoko-text-header sticky top-0 z-20 w-full px-6 py-4 shadow 2xl:px-0">
      <div className="mx-auto flex max-w-[1440px] flex-auto items-center justify-between">
        <Link className="flex h-16 items-center justify-center gap-4" to="/">
          <img src="/images/common/shoko-icon.svg" alt="Shoko Site" className="w-[4.688rem]" />
          <h3 className="text-shoko-text-header hover:text-shoko-link-hover font-medium">
            Shoko
          </h3>
        </Link>
        <div className="hidden gap-4 font-medium xl:inline-flex">
          {navRoutes.map((route) => (
            <Link
              key={route.title}
              to={route.route}
              className={`flex items-center gap-x-2${route.route === currentURL ? ' text-shoko-link' : ''}`}
            >
              {route.icon && (
                route.icon
              )}
              {route.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-x-2">
          <Button buttonType="circle" className="size-[2.813rem]" onClick={toggleTheme}>
            <Icon
              className={cx(theme === 'dark' ? 'rotate-180' : '')}
              icon={mdiThemeLightDark}
            />
          </Button>
          <Button buttonType="circle" className="size-[2.813rem]">
            <Icon icon={mdiMagnify} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
