import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from '@remix-run/react';
import cx from 'classnames';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import {
  ExternalLinksProps,
  InternalLinksProps,
  MobileMenuProps,
  NavRouteBuilderProps,
  NavRouteProps,
} from '~/types/layout';
import Button from '~/components/common/Button';

const navRoutes: NavRouteProps[] = [
  { title: 'About', route: '/about' },
  { title: 'Blog', route: '/blog' },
  { title: 'Changelog', route: 'https://docs.shokoanime.com/changelog/shoko-server' },
  { title: 'Contributors', route: '/contributors' },
  { title: 'Downloads', route: '/downloads/' },
  { title: 'Documentation', route: 'https://docs.shokoanime.com/' },
  { title: 'GitHub', route: 'https://github.com/ShokoAnime/', icon: <FaGithub size={24} /> },
  { title: 'Discord', route: 'https://discord.gg/vpeHDsg', icon: <FaDiscord size={24} /> },
];

const NavRouteBuilder = ({ currentURL, className, onClick }: NavRouteBuilderProps) => {
  return (
    <nav className={cx('mx-8 flex flex-col items-center justify-center gap-6 font-header lg:flex-row', className)}>
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
              onClick={onClick}
            />
          );
      })}
    </nav>
  );
};

const InternalLink = ({ title, route, isActive, onClick }: InternalLinksProps) => (
  <Link
    key={title}
    to={route}
    onClick={onClick}
    className={cx('flex items-center gap-x-2 text-shoko-18', isActive && '!text-shoko-link')}
  >
    {title}
  </Link>
);

const ExternalLink = ({ title, url, icon }: ExternalLinksProps) => (
  <a
    key={title}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-x-2 text-shoko-18"
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

  const handleLinkClick = () => {
    setShowMobileMenu(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-end backdrop-blur">
      <div
        ref={menuRef}
        className={cx(
          'flex h-screen w-64 max-w-full flex-col bg-shoko-bg-alt transition-transform duration-300 ease-in-out',
          isVisible ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex justify-end p-8">
          <Button buttonType="text" onClick={() => setShowMobileMenu(false)}>
            <PanelLeftOpen />
          </Button>
        </div>
        <NavRouteBuilder
          className="!items-end"
          currentURL={currentURL}
          onClick={handleLinkClick}
        />
      </div>
    </div>
  );
};

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const currentURL = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={cx(
          'sticky top-0 z-20 w-full transition-all duration-300',
          isScrolled && 'shadow-md backdrop-blur',
        )}
      >
        <div className="mx-auto flex max-w-[1440px] justify-between px-6 py-3 font-header">
          <div className="flex items-center gap-x-4 text-shoko-36">
            <img
              src="/images/common/shoko-icon.svg"
              alt="Shoko Site"
              className="size-16"
            />
            <Link to="/">
              Shoko
            </Link>
          </div>
          <NavRouteBuilder className="hidden xl:flex" currentURL={currentURL} />
          <div className="flex items-center gap-x-2 xl:hidden">
            <Button
              buttonType="round"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <PanelLeftClose />
            </Button>
          </div>
        </div>
      </header>
      {showMobileMenu && <MobileMenu setShowMobileMenu={setShowMobileMenu} />}
    </>
  );
};

export default Header;
