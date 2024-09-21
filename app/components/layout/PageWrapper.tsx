import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useMatches } from '@remix-run/react';
import cx from 'classnames';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import { useSetPageTitle } from '~/hooks/useSetPageTitle';
import { useBackground } from '~/hooks/useBackground';

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  const [banner, setBanner] = useState<string | null>(null);
  const { backgroundImage, backgroundImageHeight, resetBackground } = useBackground();
  const location = useLocation();
  const matches = useMatches();

  const currentURL = location.pathname;

  const getCurrentPage = useMemo(() => {
    const segments = currentURL.split('/').filter(Boolean);
    return segments.length > 0 ? segments[segments.length - 1] : '';
  }, [currentURL]);

  useSetPageTitle(getCurrentPage);

  useEffect(() => {
    if (matches.some((match) => match.id === '404')) return;
    resetBackground();
  }, [currentURL, resetBackground, matches]);

  const height = useMemo(() => {
    if (backgroundImageHeight !== null) {
      return `h-[${backgroundImageHeight}px]`;
    }

    return currentURL === '/' ? 'h-[1000px]' : 'h-[900px]';
  }, [backgroundImageHeight, currentURL]);

  const getHomepageBanner = () => '/images/banners/banner-1.webp';

  const getRandomBanner = () => {
    const totalBanners = 9;
    const excludedBanner = 1;
    let randomBanner;

    do {
      randomBanner = Math.floor(Math.random() * totalBanners) + 1;
    } while (randomBanner === excludedBanner);

    return `/images/banners/banner-${randomBanner}.webp`;
  };

  const getBlogBanner = () => backgroundImage;

  useEffect(() => {
    const setBannerImage = () => {
      if (currentURL === '/') {
        setBanner(getHomepageBanner());
      } else if (currentURL.includes('blog/')) {
        const blogBanner = getBlogBanner();
        if (backgroundImage) {
          setBanner(blogBanner);
        }
      } else {
        setBanner(getRandomBanner());
      }
    };

    setBannerImage();
  }, [backgroundImage, currentURL]);

  const backgroundStyle = useMemo(() => {
    if (!banner) return {};
    return {
      backgroundImage:
        `linear-gradient(to bottom, rgba(23, 24, 31, 0.9), rgba(23, 24, 31, 0.9) 60%, rgba(23, 24, 31, 1) ${
          backgroundImageHeight === null ? '80%' : '100%'
        }), url(${banner})`,
    };
  }, [banner, backgroundImageHeight]);

  return (
    <div className="relative" style={{ minHeight: '100vh' }}>
      {banner && (
        <div
          className={cx('absolute inset-0 bg-cover bg-center bg-no-repeat', height)}
          style={backgroundStyle}
        />
      )}
      <Header />
      <div className="relative mx-auto flex h-full min-h-[calc(100vh-221px)] max-w-[1440px] flex-col px-6">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageWrapper;
