import { useEffect, useState } from 'react';
import { useLocation } from '@remix-run/react';

import { useSetPageTitle } from '~/hooks/useSetPageTitle';
import { convertToProperName } from '~/helpers/helpers';

import LinkButton from '~/components/common/LinkButton';
import Text from '~/components/common/Text';

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
    <div className="relative mt-0 h-[400px] w-full overflow-hidden lg:mt-16 lg:h-[600px]">
      <div
        className="inset-0 mx-auto size-full max-w-[1440px] rounded-none bg-cover bg-top lg:rounded-lg"
        style={{ backgroundImage: `url(/images/blog/${image})` }}
      />
      <div
        className="absolute inset-0 mx-auto w-full max-w-[1440px] rounded-none lg:rounded-lg"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgba(10,11,29,0.8) 20%, rgba(10,11,29,0.1) 55%, rgba(10,11,29,0.1) 85%)',
        }}
      >
      </div>
      <div className="absolute inset-x-0 bottom-0 p-8">
        <div className={`mx-auto flex flex-col items-center gap-y-2`}>
          <div className="flex justify-center gap-x-2">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-x-2">
                <LinkButton buttonType="breadcrumb" to="/">
                  Shoko
                </LinkButton>
                <h4 className="text-shoko-text-alt">{'>>'}</h4>
                {breadcrumbs.slice(0, -1).map((segment, index) => (
                  <div className="flex items-center gap-x-2" key={index}>
                    <LinkButton buttonType="breadcrumb" to={`/${breadcrumbs.slice(0, index + 1).join('/')}`}>
                      {convertToProperName(segment)}
                    </LinkButton>
                    {breadcrumbs.length > index + 2 && <h4 className="text-shoko-text-alt">{'>>'}</h4>}
                  </div>
                ))}
              </div>
              <Text size="h1" className="text-center capitalize text-shoko-text-alt">
                {title}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailBanner;
