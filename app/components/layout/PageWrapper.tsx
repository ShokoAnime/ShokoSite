import { ReactNode, useMemo, useState } from 'react';
import { useLocation } from '@remix-run/react';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import { useSetPageTitle } from '~/hooks/useSetPageTitle';
import { useBackground } from '~/hooks/useBackground';

type PageWrapperProps = {
  children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  const [lastPage, setLastPage] = useState<string>();
  const { pathname: currentURL } = useLocation();
  const { backgroundImage, backgroundImageFull } = useBackground();

  const currentPage = useMemo(() => {
    const segments = currentURL.split('/').filter(Boolean);
    setLastPage(segments[0]);
    return segments.length > 0 ? segments[segments.length - 1] : '';
  }, [currentURL]);

  useSetPageTitle(currentPage);

  const getRandomBanner = () => {
    const totalBanners = 12;
    const randomBanner = Math.floor(Math.random() * totalBanners) + 1;
    return `/images/banners/banner-${randomBanner}.jpg`;
  };

  const banner = useMemo(() => {
    if (currentURL === '/') {
      return '/images/banners/main-banner.jpg';
    } else if (currentURL.includes('blog/') && !backgroundImageFull) {
      return backgroundImage;
    } else if (!currentURL.includes('blog/')) {
      return getRandomBanner();
    } else if (currentPage === lastPage) {
      return getRandomBanner();
    } else if (backgroundImage !== null) {
      return backgroundImage;
    } else {
      return getRandomBanner();
    }
  }, [backgroundImage, currentURL, backgroundImageFull, currentPage, lastPage]);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 h-[850px] overflow-hidden">
        <img
          src={banner ?? '/images/banners/main-banner.jpg'}
          alt="Page banner"
          className="size-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(23, 24, 31, 0.85), 
              rgba(23, 24, 31, 0.88) 30%, 
              rgba(23, 24, 31, 0.93) 50%, 
              rgba(23, 24, 31, .96) 80%, 
              rgba(23, 24, 31, .99) 90%, 
              rgba(23, 24, 31, 1) 95%
              ${backgroundImage !== null ? '80%' : '100%'})`,
          }}
        />
      </div>
      <Header />
      <div className="relative mx-auto flex h-full min-h-[calc(100vh-221px)] max-w-screen-2xl flex-col px-6">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageWrapper;
