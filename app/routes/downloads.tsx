import React, { useEffect } from 'react';
import { Outlet, ShouldRevalidateFunction, useLocation, useNavigate } from '@remix-run/react';
import { useDownloadsContext } from '~/context/DownloadsContext';
import { Button, Footer, Header, Loading, PageBanner } from '~/components';
import { LoaderFunction, redirect } from '@remix-run/node';
import { useDownloadsData } from '~/hooks/useDownloadsData';

const DEFAULT_TAB = 'shoko-server';
const navigationTabs = ['Shoko Server', 'Media Player Plugins', 'Web UI Themes', 'Renamer Plugins', 'Legacy'];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  if (url.pathname === '/downloads' || url.pathname === '/downloads/') {
    return redirect(`/downloads/${DEFAULT_TAB}`, { status: 301 });
  }

  return null;
};

export const shouldRevalidate: ShouldRevalidateFunction = (
  { currentParams, nextParams, defaultShouldRevalidate },
) => {
  if (currentParams.file !== nextParams.file) {
    return true;
  }

  return defaultShouldRevalidate;
};

export default function Downloads() {
  const { tab, setTab, isLoading, setIsLoading } = useDownloadsContext();
  const location = useLocation();
  const navigate = useNavigate();

  useDownloadsData(tab);

  useEffect(() => {
    const pageURL = location.pathname.split('/').slice(2);
    const tabName = pageURL.length === 0
      ? 'Shoko Server'
      : pageURL[0]
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    setTab(tabName);
  }, [location.pathname, setTab]);

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    setTab(target.innerText);
    navigate(target.innerText.replace(/ /g, '-').toLowerCase());
  };

  return (
    <>
      <Header />
      <PageBanner
        title="Downloads"
        description="Browse through our complete selection of programs, plugins, Web UI Themes and other tools available in the Shoko Suite."
      />

      {isLoading ? '' : (
        <div className="h-[5.5rem] bg-backgroundAlt-light p-4 dark:bg-backgroundAlt-dark">
          <div className="mx-auto flex h-full max-w-[1440px] items-center justify-center gap-x-2 text-xl font-medium text-textHeader-light dark:text-textHeader-dark">
            {navigationTabs.map((tabName) => (
              <Button
                key={tabName}
                buttonType={tab === tabName ? 'primary' : 'padded'}
                onClick={handleTabClick}
              >
                {tabName}
              </Button>
            ))}
          </div>
        </div>
      )}

      <Outlet />

      <Footer altBackground={true} />
    </>
  );
}
