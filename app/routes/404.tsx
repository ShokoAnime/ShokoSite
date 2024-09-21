import PageNotFound from '~/components/layout/PageNotFound';
import { useBackground } from '~/hooks/useBackground';
import { useEffect } from 'react';

export default function NotFoundPage() {
  const { setBackgroundImageHeight } = useBackground();

  useEffect(() => {
    setBackgroundImageHeight('100vh');
  }, [setBackgroundImageHeight]);

  return <PageNotFound />;
}
