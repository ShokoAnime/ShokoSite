import { useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import cx from 'classnames';

import { useSetPageTitle } from '~/hooks/useSetPageTitle';
import { convertToProperName } from '~/helpers/helpers';
import LinkButton from '~/components/common/LinkButton';
import Text from '~/components/common/Text';

type PageBannerProps = {
  title: string;
  description?: string;
};

const PageBanner = ({ title, description }: PageBannerProps) => {
  const [bannerUrl, setBannerUrl] = useState('');
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const location = useLocation();

  const bannerCount = 9; // Increase when adding a new banner

  useSetPageTitle(title);

  // Function to shuffle an array
  const shuffleArray = (array: number[]): number[] => {
    return array.map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  useEffect(() => {
    const updateBannerUrl = () => {
      const pathSegments = location.pathname.split('/');
      const isValidPath = pathSegments.length === 2 || pathSegments.length === 3 || pathSegments.length === 4;

      if (!isValidPath) {
        setBreadcrumbs(pathSegments.slice(1).filter(segment => segment));
        return;
      }

      if (!bannerUrl || !isValidPath) {
        const banners = shuffleArray(Array.from({ length: bannerCount }, (_, i) => i + 1));
        const randomBanner = banners.pop();

        setBannerUrl(`/images/banners/banner-${randomBanner}.webp`);
      }

      setBreadcrumbs(pathSegments.slice(1).filter(segment => segment));
    };

    updateBannerUrl();
  }, [bannerUrl, location.pathname]);

  const renderBreadcrumbs = () =>
    breadcrumbs.map((segment, index) => {
      const isLastSegment = index === breadcrumbs.length - 1;
      const path = `/${breadcrumbs.slice(0, index + 1).join('/')}`;

      return (
        <div className="flex gap-x-2" key={index}>
          {!isLastSegment
            ? (
              <LinkButton buttonType="breadcrumb" to={path}>
                {convertToProperName(segment)}
              </LinkButton>
            )
            : <Text size="h4" className="capitalize text-shoko-text-alt">{convertToProperName(segment)}</Text>}
          {!isLastSegment && <h4 className="text-shoko-text-alt">{'>>'}</h4>}
        </div>
      );
    });

  return (
    <div className="relative h-[22.5rem]">
      <div className="absolute h-[22.5rem] w-full bg-shoko-overlay" />
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
        <div className={cx('flex w-full flex-col items-center justify-center', description ? 'gap-y-4' : 'gap-y-2')}>
          <Text size="h1" className="capitalize text-shoko-text-alt">{convertToProperName(title)}</Text>
          <Text size="pageBannerText" className="w-full max-w-[850px] text-center text-shoko-text-alt">
            {description}
          </Text>
          <div className="flex items-center justify-between gap-x-2">
            <LinkButton buttonType="breadcrumb" to="/">
              Shoko
            </LinkButton>
            <Text size="h4" className="font-header text-shoko-text-alt">{'>>'}</Text>
            {renderBreadcrumbs()}
          </div>
        </div>
      </div>
      <div className="h-full bg-cover bg-top" style={{ backgroundImage: `url(${bannerUrl})` }} />
    </div>
  );
};

export default PageBanner;
