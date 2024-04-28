import { Link } from '@remix-run/react';

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

function Footer() {
  return (
    <div className="w-[100%] py-[37px]">
      <div className="mx-auto container flex flex-auto items-center justify-center">
        <div className="flex flex-auto items-start justify-start gap-4">
          {samplesRoutes.map((route) => (
            <Link key={route.title} to={route.route} className="flex gap-x-2">
              {route.icon && <span className={route.icon} />}
              {route.title}
            </Link>
          ))}
        </div>
        <div>© 2016-2023 Shoko. All Rights Reserved.</div>
      </div>
    </div>
  );
}

export default Footer;
