import { useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';

interface PageBannerProps {
  title: string;
  description: string;
}

export const PageBanner = ({ title, description }: PageBannerProps) => {
  const [bannerURL, setBannerURL] = useState<string>('');
  const [buildBreadcrumbs, setBuildBreadcrumbs] = useState<string[]>([]);

  const location = useLocation();

  // Increase when adding a new banner.
  const bannerCount = 9;

  useEffect(() => {
    const randomBanner = Math.floor(Math.random() * bannerCount) + 1;

    setBannerURL(`/images/banners/banner-${randomBanner}.jpg`);
    setBuildBreadcrumbs(location.pathname.split('/').slice(1));
  }, [location.pathname]);

  return (
    <div className="relative h-[22.5rem]">
      <div className="absolute h-[22.5rem] w-full bg-overlay-light" />
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
        <div className="mx-auto flex max-w-[850px] flex-col items-center gap-y-8">
          <h1 className="text-textAlt-light dark:text-textAlt-dark">{title}</h1>
          <h4 className="text-center text-textAlt-light dark:text-textAlt-dark">{description}</h4>
          <div className="flex gap-x-2">
            <a
              className="text-2xl text-headerLink-light hover:text-headerLinkHover-light dark:text-headerLink-dark hover:dark:text-headerLinkHover-dark"
              href="/"
            >
              Shoko
            </a>
            <h4 className="text-textAlt-light dark:text-textAlt-dark">/</h4>
            {buildBreadcrumbs.map((data, index) => (
              <div key={index}>
                {buildBreadcrumbs.length > index + 1
                  ? (
                    <a
                      className="text-2xl capitalize text-headerLink-light hover:text-headerLinkHover-light dark:text-headerLink-dark hover:dark:text-headerLinkHover-dark"
                      href={`/${data}`}
                    >
                      {data}
                    </a>
                  )
                  : <h4 className="capitalize text-textAlt-light dark:text-textAlt-dark">{data}</h4>}
                {buildBreadcrumbs.length > index + 1 && (
                  <h4 className="text-textAlt-light dark:text-textAlt-dark">
                    /
                  </h4>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-full bg-cover bg-top" style={{ backgroundImage: `url(${bannerURL})` }} />
    </div>
  );
};
