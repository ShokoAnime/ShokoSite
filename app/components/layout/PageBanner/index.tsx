import { useLocation, useNavigate } from '@remix-run/react';
import { useEffect, useState } from 'react';
import cx from 'classnames';
import { useBannerContext } from '~/context/BannerContext';
import { Button } from '~/components';
import { urlFormatProper } from '~/helpers/urlFormat';

interface PageBannerProps {
  title: string;
  description?: string;
}

export const PageBanner = ({ title, description }: PageBannerProps) => {
  const { bannerURL, setBannerURL } = useBannerContext();
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const bannerCount = 9; // Increase when adding a new banner

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const isValidPath = pathSegments.length === 3 || pathSegments.length === 4;

    if (bannerURL === '' || !isValidPath) {
      const randomBanner = Math.floor(Math.random() * bannerCount) + 1;
      setBannerURL(`/images/banners/banner-${randomBanner}.webp`);
    }

    setBreadcrumbs(pathSegments.slice(1));
  }, [location.pathname]);

  const formatBreadcrumb = (segment: string) => {
    return urlFormatProper(segment);
  };

  const onClickHandler = (url: string) => {
    navigate(url);
  };

  return (
    <div className="relative h-[22.5rem]">
      <div className="bg-shoko-overlay absolute h-[22.5rem] w-full" />
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
        <div className={cx(`mx-auto flex max-w-[850px] flex-col items-center`, description ? 'gap-y-8' : 'gap-y-4')}>
          <h1 className="text-shoko-text-alt">{title}</h1>
          <h4 className="text-shoko-text-alt text-center">{description}</h4>
          <div className="flex">
            <Button buttonType="breadcrumb" onClick={() => onClickHandler('/')}>
              Shoko
            </Button>
            <h4 className="text-shoko-text-alt">/</h4>
            {breadcrumbs.map((segment, index) => (
              <div className="flex" key={index}>
                {breadcrumbs.length > index + 1
                  ? (
                    <Button
                      buttonType="breadcrumb"
                      onClick={() => onClickHandler(`/${breadcrumbs.slice(0, index + 1).join('/')}`)}
                    >
                      {formatBreadcrumb(segment)}
                    </Button>
                  )
                  : <h4 className="text-shoko-text-alt ml-2 capitalize">{formatBreadcrumb(segment)}</h4>}
                {breadcrumbs.length > index + 1 && <h4 className="text-shoko-text-alt">/</h4>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-full bg-cover bg-top" style={{ backgroundImage: `url(${bannerURL})` }} />
    </div>
  );
};
