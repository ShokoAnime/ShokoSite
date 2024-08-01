import { Link, useLocation } from '@remix-run/react';
import cx from 'classnames';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { mdiAlphaX, mdiCloseCircleOutline, mdiMagnify, mdiMenuClose, mdiMenuOpen, mdiThemeLightDark } from '@mdi/js';
import { ExternalLinksProps, InternalLinksProps, MobileMenuProps, NavRouteProps } from '~/types/layout';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';
import { useTheme } from '~/context/ThemeContext';
import { useEffect, useRef, useState } from 'react';

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

export const InternalLink = ({ title, route, isActive, onClick }: InternalLinksProps) => (
  <Link
    key={title}
    to={route}
    onClick={onClick}
    className={cx(
      'flex items-center gap-x-2 text-shoko-text-header hover:text-shoko-link-hover',
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
    className="flex items-center gap-x-2 text-shoko-text-header hover:text-shoko-link-hover"
  >
    {icon}
    <span>{title}</span>
  </a>
);

const MobileMenu = ({ setShowMobileMenu }: MobileMenuProps) => {
  const { pathname: currentURL } = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowMobileMenu]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed right-0 top-0 z-40 size-full backdrop-blur">
      <div
        ref={menuRef}
        className={cx(
          'ml-auto h-full w-fit bg-shoko-bg backdrop-blur-none transition-transform duration-500 ease-in-out',
          isVisible ? 'translate-x-0 transform' : 'translate-x-full transform',
        )}
      >
        <div className="flex flex-row-reverse pr-2 pt-4">
          <Button buttonType="text" onClick={() => setShowMobileMenu(false)}>
            <Icon
              icon={mdiMenuClose}
              size={36}
            />
          </Button>
        </div>
        <nav className={cx('mx-8 flex flex-col items-end justify-center gap-y-4')}>
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
                  onClick={() => setShowMobileMenu(false)}
                />
              );
          })}
        </nav>
      </div>
    </div>
  );
};

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const currentURL = location.pathname;

  return (
    <>
      <div className="sticky top-0 z-20 w-full border-b border-shoko-border bg-shoko-bg-alt py-3 font-header font-semibold">
        <div className="mx-6 flex max-w-[1440px] items-center justify-between 2xl:mx-auto">
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
          <nav className="hidden items-center gap-x-4 xl:flex">
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
            {
              /*
						TODO: Implement search functionality once Algolia is set up.
						<Button buttonType="circle" className="size-[2.813rem]">
						<Icon icon={mdiMagnify} />
						</Button>
						*/
            }
            <Button
              buttonType="circle"
              className="size-[2.813rem] xl:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Icon
                icon={!showMobileMenu ? mdiMenuOpen : mdiMenuClose}
              />
            </Button>
          </div>
        </div>
      </div>
      {showMobileMenu && <MobileMenu setShowMobileMenu={setShowMobileMenu} />}
    </>
  );
};

export default Header;
