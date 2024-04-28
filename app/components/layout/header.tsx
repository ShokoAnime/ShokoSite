import { Link } from '@remix-run/react';
import { Button } from '~/components/common';

const samplesRoutes = [
  { title: 'About', route: '/about' },
  { title: 'Blog', route: '/blog' },
  { title: 'Changelog', route: '/change-log' },
  { title: 'Contributors', route: '/contributors' },
  { title: 'Downloads', route: '/downloads' },
  { title: 'Documentations', route: '/document' },
  { title: 'Github', route: 'https://github.com', icon: 'si si-github' },
  { title: 'Discord', route: 'https://discord.com', icon: 'si si-discord' },
];

function Header() {
  return (
    <div className="w-[100%] bg-[#F5F4F8] p-4">
      <div className="container mx-auto flex flex-auto justify-between items-center">
        <div className="flex justify-center items-center gap-4">
          <img src="/images/shoko-icon.svg" alt="Shoko Site" className="aspect-[25/22]" />
          <div className="text-4xl font-medium">Shoko</div>
        </div>
        <div className="flex gap-4 font-medium">
          {samplesRoutes.map((route) => (
            <Link key={route.title} to={route.route} className="flex gap-x-2">
              {route.icon && <span className={route.icon} />}
              {route.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-x-2">
          <Button type="secondary" className="rounded-[50%] w-[45px] h-[45px]">
            <span className="mdi mdi-theme-light-dark" />
          </Button>
          <Button type="secondary" className="rounded-[50%] w-[45px] h-[45px]">
            <span className="mdi mdi-magnify"></span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
