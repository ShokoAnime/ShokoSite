import { Link, useLocation } from '@remix-run/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Button } from '~/components/common';
import { useTheme } from '~/context/toggleTheme';

export const navRoutes = [
  { title: 'About', route: '/about' },
  { title: 'Blog', route: '/blog' },
  { title: 'Changelog', route: '/change-log' },
  { title: 'Contributors', route: '/contributors' },
  { title: 'Downloads', route: '/downloads' },
  { title: 'Documentation', route: '/document' },
  { title: 'Github', route: 'https://github.com', icon: 'si si-github' },
  { title: 'Discord', route: 'https://discord.com', icon: 'si si-discord' },
];

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const currentURL = location.pathname;

  return (
    <div className="sticky top-0 z-20 w-full bg-backgroundAlt-light p-4 text-textHeader-light shadow dark:bg-backgroundAlt-dark dark:text-textHeader-dark">
      <div className="mx-auto flex max-w-[1440px] flex-auto items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <a href="/">
            <img src="/images/shoko-icon.svg" alt="Shoko Site" className="w-[4.688rem]" />
          </a>
          <h3 className="font-medium text-textHeader-light dark:text-textHeader-dark">Shoko</h3>
        </div>
        <div className="flex gap-4 font-medium">
          {navRoutes.map((route) => (
            <Link
              key={route.title}
              to={route.route}
              className={`flex gap-x-2 ${route.route === currentURL && 'text-link-light dark:text-link-dark'}`}
            >
              {route.icon && <span className={route.icon} />}
              {route.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-x-2">
          <Button buttonType="secondary" className="size-[2.813rem]" onClick={toggleTheme}>
            <FontAwesomeIcon
              className={`${theme === 'light' && 'pl-0.5'}`}
              icon={theme === 'dark' ? faSun : faMoon}
              size="lg"
            />
          </Button>
          <Button buttonType="secondary" className="size-[2.813rem]">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </Button>
        </div>
      </div>
    </div>
  );
};
