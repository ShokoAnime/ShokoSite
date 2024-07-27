import { Link, useLocation } from '@remix-run/react';
import cx from 'classnames';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { mdiMenuClose, mdiMenuOpen, mdiThemeLightDark } from '@mdi/js';
import { ExternalLinksProps, InternalLinksProps, NavRouteProps } from '~/types/layout';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';
import { useTheme } from '~/context/ThemeContext';
import { useState } from 'react';

export const navRoutes: NavRouteProps[] = [
  { title: 'About', route: '/about' },
  { title: 'Blog', route: '/blog' },
  { title: 'Changelog', route: 'https://docs.shokoanime.com/changelog/shoko-server' },
  { title: 'Contributors', route: '/contributors' },
  { title: 'Downloads', route: '/downloads/' },
  { title: 'Documentation', route: 'https://docs.shokoanime.com/' },
  { title: 'GitHub', route: 'https://github.com/ShokoAnime/', icon: <FaGithub size={24} /> },
  { title: 'Discord', route: 'https://discord.gg/vpeHDsg', icon: <FaDiscord size={24} /> },
];

export const InternalLink = ({ title, route, isActive }: InternalLinksProps) => (
  <Link
    key={title}
    to={route}
    className={cx(
      'text-shoko-text-header hover:text-shoko-link-hover flex items-center gap-x-2',
      isActive && '!text-shoko-link',
    )}
  >
    {title}
  </Link>
);

export const ExternalLink = ({ title, url, icon }: ExternalLinksProps) => (
  <a
    key={title}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="hidden text-shoko-text-header hover:text-shoko-link-hover lg:flex lg:items-center gap-x-2"
  >
    {icon}
    <span>{title}</span>
  </a>
);

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const currentURL = location.pathname;

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-shoko-bg-alt font-header border-shoko-border sticky top-0 z-20 w-full border-b py-3 font-semibold">
      <div className="mx-auto flex items-center justify-between">
        <h2 className="flex items-center gap-x-4">
          <img
            src="/images/common/shoko-icon.svg"
            alt="Shoko Site"
            className="size-[4.688rem]"
          />
          <Link to="/">
            Shoko
          </Link>
        </h2>
        <nav className="hidden md:flex items-center gap-x-4">
          {navRoutes.map((route) => {
            const isExternal = route.route.startsWith('http');
            const isActive = isExternal ? false : currentURL.startsWith(route.route);

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
                  isActive={isActive}
                />
              );
          })}
        </nav>
        <div className="flex gap-x-2">
          <Button buttonType="circle" className="size-[2.813rem]" onClick={toggleTheme}>
            <Icon
              className={cx(theme === 'dark' ? 'rotate-180' : '')}
              icon={mdiThemeLightDark}
            />
          </Button>

          <Button buttonType="outline" className="md:hidden" onClick={() => setShowMenu(_ => !showMenu)}>
            <Icon
              icon={showMenu === false ? mdiMenuOpen : mdiMenuClose}
            />
          </Button>
          {
            /*
          TODO: Implement search functionality once Algolia is set up.
          <Button buttonType="circle" className="size-[2.813rem]">
          <Icon icon={mdiMagnify} />
          </Button>
          */
          }
        </div>
      </div>
      <nav className="flex flex-col justify-center md:hidden">
        {navRoutes.map((route) => {
          const isExternal = route.route.startsWith('http');
          const isActive = isExternal ? false : currentURL.startsWith(route.route);

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
                isActive={isActive}
              />
            );
        })}
      </nav>
    </div>
  );
};

export default Header;
