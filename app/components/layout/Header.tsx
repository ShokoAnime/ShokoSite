import { Link, useLocation } from '@remix-run/react';
import cx from 'classnames';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { mdiMenuClose, mdiMenuOpen, mdiThemeLightDark } from '@mdi/js';
import { NavRouteProps } from '~/types/layout';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';
import { useTheme } from '~/context/ThemeContext';
import { useState } from 'react';
import { ExternalLink } from '../common/ExternalLink';
import { InternalLink } from '../common/InternalLink';

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



const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const currentURL = location.pathname;

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-shoko-bg-alt font-header border-shoko-border sticky top-0 z-20 w-full border-b py-3 font-semibold">
      <div className="mx-auto flex items-center justify-between">
        <Link to="/" className='flex items-center gap-x-4'>
          <img
            src="/images/common/shoko-icon.svg"
            alt="Shoko Site"
            className="size-[45px] md:size-[4.688rem]"
          />
          <h2 className='inline-block lg:hidden xl:inline-block text-[24px] md:text-[36px]'>Shoko</h2>
        </Link>
        <nav className="hidden lg:flex items-center gap-x-4">
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
        <div className="flex gap-x-2 mr-[20px]">
          <Button buttonType="circle" className="size-[2.813rem]" onClick={toggleTheme}>
            <Icon
              className={cx(theme === 'dark' ? 'rotate-180' : '')}
              icon={mdiThemeLightDark}
            />
          </Button>

          <Button buttonType="circle" className="lg:hidden size-[2.813rem]" onClick={() => setShowMenu(_ => !showMenu)}>
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
      <nav className={cx(`${showMenu ? 'flex' : 'hidden'} flex-col items-end justify-center lg:hidden mx-auto mr-[25px]`)}>
        {navRoutes.map(({ route, title, icon }) => {
          const isExternal = route.startsWith('http');
          const isActive = isExternal ? false : currentURL.startsWith(route);
          return <Link key={route} to={route}
            className={cx(
              'text-shoko-text-header hover:text-shoko-link-hover flex items-center gap-x-2',
              isActive && '!text-shoko-link',
            )}>
            {icon && icon}
            <span>{title}</span>
          </Link>
        })}
      </nav>
    </div>
  );
};

export default Header;
