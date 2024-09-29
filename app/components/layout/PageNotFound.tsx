import { useBackground } from '~/hooks/useBackground';
import { useEffect } from 'react';
import { useSetPageTitle } from '~/hooks/useSetPageTitle';

const PageNotFound = () => {
  const { setBackgroundImageFull } = useBackground();

  useSetPageTitle('404 - Page Not Found');

  useEffect(() => {
    setBackgroundImageFull(true);
  }, [setBackgroundImageFull]);

  return (
    <>
      <div className="my-auto flex h-full flex-col justify-center gap-y-8 text-center">
        <h2 className="text-[20vw] leading-none opacity-50">404</h2>
        <div className="flex flex-col gap-y-4 text-shoko-24">
          <div className="">Something went wrong, and you broke the site.</div>
          <div className="">
            Feel free to let <strong>EC</strong> know about it on{' '}
            <a className="text-shoko-link hover:text-shoko-link-hover" href="https://discord.com/">Discord</a>.
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
