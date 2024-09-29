import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from '@remix-run/react';
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
  const { backgroundImage, backgroundImageFull } = useBackground();
  const location = useLocation();
  const currentURL = location.pathname;

  const getCurrentPage = useMemo(() => {
    const segments = currentURL.split('/').filter(Boolean);
    return segments.length > 0 ? segments[segments.length - 1] : '';
  }, [currentURL]);

  const getRandomBanner = () => {
    const totalBanners = 12;
    const randomBanner = Math.floor(Math.random() * totalBanners) + 1;
    return `/images/banners/banner-${randomBanner}.jpg`;
  };

  const backgroundGradient = useMemo(() => {
    return {
      backgroundImage:
        `linear-gradient(to bottom, rgba(23, 24, 31, 0.9), rgba(23, 24, 31, 0.9) 60%, rgba(23, 24, 31, 1) 80%
        ${backgroundImage !== null ? '80%' : '100%'}), url(${banner})`,
    };
  }, [backgroundImage, banner]);

  useSetPageTitle(getCurrentPage);

  useEffect(() => {
    if (currentURL === '/') {
      return setBanner('/images/banners/main-banner.jpg');
    }

    if (backgroundImage !== null) {
      return setBanner(backgroundImage);
    }

    if (currentURL.includes('blog/') && !backgroundImageFull) {
      return setBanner(backgroundImage);
    }

    return setBanner(getRandomBanner());
  }, [backgroundImage, backgroundImageFull, currentURL]);

  return (
    <div className="relative" style={{ minHeight: '100vh' }}>
      {banner && (
        <div
          className={cx(`absolute inset-0 bg-cover bg-center bg-no-repeat
          ${backgroundImageFull ? 'h-dvh' : 'h-[900px]'}`)}
          style={backgroundGradient}
        />
      )}
      <Header />
      <div className="relative mx-auto flex h-full min-h-[calc(100vh-221px)] max-w-screen-2xl flex-col px-6">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageWrapper;
