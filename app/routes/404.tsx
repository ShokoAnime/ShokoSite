import { Footer, Header, PageNotFound } from '~/components';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <PageNotFound />
      <Footer altBackground={true} />
    </>
  );
}
