import { Link } from '@remix-run/react';

const samplesRoutes = [
  { title: 'About', route: '/about' },
  { title: 'Blog', route: '/blog' },
  { title: 'Changelog', route: '/change-log' },
  { title: 'Contributors', route: '/contributors' },
  { title: 'Downloads', route: '/downloads' },
  { title: 'Documentations', route: '/document' },
  { title: 'Github', route: 'https://github.com' },
  { title: 'Discord', route: 'https://discord.com' },
];

function Header() {
  return (
    <div className="w-[100%] bg-[#F5F4F8] p-4">
      <div className="container mx-auto flex flex-auto justify-between items-center">
        <div className="flex justify-center items-center gap-4">
          <img src="/images/shoko-icon.svg" alt="Shoko Site" className="w-[75px]" />
          <div className="text-[36px] font-medium">Shoko</div>
        </div>
        <div className="flex gap-4 font-medium">
          {samplesRoutes.map((route) => (
            <Link key={route.title} to={route.route}>
              {route.title}
            </Link>
          ))}
        </div>
        <div>Theme + Search</div>
      </div>
    </div>
  );
}

export default Header;
