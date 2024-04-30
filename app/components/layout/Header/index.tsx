import { Link, useLocation } from '@remix-run/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faMagnifyingGlass, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Button } from '~/components/common';
import { useTheme } from '~/context/toggleTheme';

interface NavRoute {
  title: string;
  route: string;
  icon?: IconDefinition;
}

export const navRoutes: NavRoute[] = [
  { title: 'About', route: '/about' },
  { title: 'Blog', route: '/blog' },
  { title: 'Changelog', route: 'https://docs.shokoanime.com/changelog/shoko-server' },
  { title: 'Contributors', route: '/contributors' },
  { title: 'Downloads', route: '/downloads' },
  { title: 'Documentation', route: 'https://docs.shokoanime.com/' },
  { title: 'Github', route: 'https://github.com', icon: faGithub },
  { title: 'Discord', route: 'https://discord.com', icon: faDiscord },
];

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const currentURL = location.pathname;

  return (
    <div className="sticky top-0 z-20 w-full bg-backgroundAlt-light px-6 py-4 text-textHeader-light shadow dark:bg-backgroundAlt-dark dark:text-textHeader-dark 2xl:px-0">
      <div className="mx-auto flex max-w-[1440px] flex-auto items-center justify-between">
        <a className="flex items-center justify-center gap-4" href="/">
          <img src="/images/shoko-icon.svg" alt="Shoko Site" className="w-[4.688rem]" />
          <h3 className="font-medium text-textHeader-light hover:text-linkHover-light dark:text-textHeader-dark dark:hover:text-linkHover-dark">
            Shoko
          </h3>
        </a>
        <div className="hidden gap-4 font-medium xl:inline-flex">
          {navRoutes.map((route) => (
            <Link
              key={route.title}
              to={route.route}
              className={`flex items-center gap-x-2${
                route.route === currentURL ? ' text-link-light dark:text-link-dark' : ''
              }`}
            >
              {route.icon && <FontAwesomeIcon icon={route.icon} size="lg" />}
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
