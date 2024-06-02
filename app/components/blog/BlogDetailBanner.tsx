import { useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { convertToProperName } from '~/helpers/utils';
import LinkButton from '~/components/common/LinkButton';
import { useSetPageTitle } from '~/hooks/useSetPageTitle';

type BlogDetailBannerProps = {
  title: string;
  image?: string;
};

const BlogDetailBanner = ({ title, image }: BlogDetailBannerProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const location = useLocation();

  useSetPageTitle(title);

  useEffect(() => {
    const pathSegments = location.pathname.split('/');

    setBreadcrumbs(pathSegments.slice(1).filter((segment) => !!segment));
  }, [location.pathname]);

  return (
    <div className="relative mt-16 h-[500px] w-full overflow-hidden ">
      <div
        className="inset-0 mx-auto size-full max-w-[1440px] rounded-lg bg-cover bg-top"
        style={{ backgroundImage: `url(/images/blog/${image})` }}
      />
      <div
        className="absolute inset-0 mx-auto w-full max-w-[1440px] rounded-lg"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgba(10,11,29,0.8) 20%, rgba(10,11,29,0.1) 55%, rgba(10,11,29,0.1) 85%)',
        }}
      >
      </div>
      <div className="absolute inset-x-0 bottom-0 p-8">
        <div className={`mx-auto flex max-w-[850px] flex-col items-center gap-y-2`}>
          <h1 className="text-shoko-text-alt text-center">{title}</h1>
          <div className="flex justify-center">
            <LinkButton buttonType="breadcrumb" to="/">
              Shoko
            </LinkButton>
            <h4 className="text-shoko-text-alt">/</h4>
            {breadcrumbs.map((segment, index) => (
              <div className="flex" key={index}>
                {breadcrumbs.length > index + 1
                  ? (
                    <LinkButton buttonType="breadcrumb" to={`/${breadcrumbs.slice(0, index + 1).join('/')}`}>
                      {convertToProperName(segment)}
                    </LinkButton>
                  )
                  : <h4 className="text-shoko-text-alt ml-2 capitalize">{convertToProperName(segment)}</h4>}
                {breadcrumbs.length > index + 1 && <h4 className="text-shoko-text-alt">/</h4>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailBanner;
