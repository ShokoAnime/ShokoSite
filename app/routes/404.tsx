import PageNotFound from '~/components/layout/PageNotFound';
import { useBackground } from '~/hooks/useBackground';
import { useEffect } from 'react';
import { useSetPageTitle } from '~/hooks/useSetPageTitle';

export default function NotFoundPage() {
  const { setBackgroundImageFull } = useBackground();

  useSetPageTitle('404 - Page Not Found');

  useEffect(() => {
    setBackgroundImageFull(true);
  }, [setBackgroundImageFull]);

  return <PageNotFound />;
}
