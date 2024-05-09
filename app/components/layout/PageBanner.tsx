import { useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import cx from 'classnames';
import { convertPathToBreadcrumb } from '~/helpers/utils';
import LinkButton from '~/components/common/LinkButton';

type PageBannerProps = {
  title: string;
  description?: string;
};

const PageBanner = ({ title, description }: PageBannerProps) => {
  const [bannerUrl, setBannerUrl] = useState('');
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  const location = useLocation();

  const bannerCount = 9; // Increase when adding a new banner

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const isValidPath = pathSegments.length === 3 || pathSegments.length === 4;

    if (bannerUrl === '' || !isValidPath) {
      const randomBanner = Math.floor(Math.random() * bannerCount) + 1;
      setBannerUrl(`/images/banners/banner-${randomBanner}.webp`);
    }

    setBreadcrumbs(pathSegments.slice(1).filter((segment) => !!segment));
  }, [location.pathname]);

  return (
    <div className="relative h-[22.5rem]">
      <div className="bg-shoko-overlay absolute h-[22.5rem] w-full" />
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
        <div className={cx(`mx-auto flex max-w-[850px] flex-col items-center`, description ? 'gap-y-8' : 'gap-y-4')}>
          <h1 className="text-shoko-text-alt">{title}</h1>
          <h4 className="text-shoko-text-alt text-center">{description}</h4>
          <div className="flex">
            <LinkButton buttonType="breadcrumb" to="/">
              Shoko
            </LinkButton>
            <h4 className="text-shoko-text-alt">/</h4>
            {breadcrumbs.map((segment, index) => (
              <div className="flex" key={index}>
                {breadcrumbs.length > index + 1
                  ? (
                    <LinkButton buttonType="breadcrumb" to={`/${breadcrumbs.slice(0, index + 1).join('/')}`}>
                      {convertPathToBreadcrumb(segment)}
                    </LinkButton>
                  )
                  : <h4 className="text-shoko-text-alt ml-2 capitalize">{convertPathToBreadcrumb(segment)}</h4>}
                {breadcrumbs.length > index + 1 && <h4 className="text-shoko-text-alt">/</h4>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-full bg-cover bg-top" style={{ backgroundImage: `url(${bannerUrl})` }} />
    </div>
  );
};

export default PageBanner;
