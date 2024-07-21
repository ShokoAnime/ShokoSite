import { Link, useLocation } from '@remix-run/react';
import cx from 'classnames';
import { mdiMenuClose, mdiMenuOpen, mdiThemeLightDark } from '@mdi/js';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';
import { useTheme } from '~/context/ThemeContext';
import { useCallback, useState } from 'react';
import { ExternalLink } from '../common/ExternalLink';
import { InternalLink } from '../common/InternalLink';
import { navRoutes } from './Layout.data';

type HeaderProps = {
  showMobileMenu?: boolean;
  onMobileMenuToggle: (value: boolean) => void;
}


const Header = ({ showMobileMenu = false, onMobileMenuToggle }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const currentURL = location.pathname;


  return (
    <div className="bg-shoko-bg-alt font-header border-shoko-border sticky top-0 z-20 w-full border-b py-3 font-semibold">
      <div className="mx-auto flex xl:max-w-[1440px] items-center justify-between">
        <Link to="/" className='flex items-center gap-x-4 ml-4'>
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

          <Button buttonType="circle" className="lg:hidden size-[2.813rem]" onClick={() => onMobileMenuToggle(!showMobileMenu)}>
            <Icon
              icon={showMobileMenu === false ? mdiMenuOpen : mdiMenuClose}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
