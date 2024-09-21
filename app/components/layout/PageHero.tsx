import { useEffect, useState } from 'react';
import { Link, useLocation } from '@remix-run/react';
import { BreadcrumbProps, PageHeroProps } from '~/types/layout';
import { convertDate, convertToProperName } from '~/helpers/helpers';
import Divider from '~/components/layout/Divider';

const PageHero = ({ title, description, date }: PageHeroProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    setBreadcrumbs(pathSegments);
  }, [location.pathname]);

  const Breadcrumb = ({ segment, index }: BreadcrumbProps) => {
    const isLastSegment = index === breadcrumbs.length - 1;
    const path = `/${breadcrumbs.slice(0, index + 1).join('/')}`;
    const formattedSegment = convertToProperName(segment);

    return (
      <div className="flex gap-x-2">
        {isLastSegment
          ? (
            <h4 className="hidden text-shoko-18 capitalize text-shoko-text md:inline-flex md:text-shoko-24">
              {formattedSegment}
            </h4>
          )
          : (
            <>
              <Link className="text-shoko-18 text-shoko-link md:text-shoko-24" to={path}>{formattedSegment}</Link>
              <h4 className="text-shoko-18 text-shoko-text md:text-shoko-24">/</h4>
            </>
          )}
      </div>
    );
  };

  return (
    <div className="mt-16 flex flex-col gap-16">
      <div className="flex flex-col items-center justify-center gap-24">
        <div className="flex max-w-[850px] flex-col items-center justify-center gap-y-4">
          <div className="flex flex-col items-center justify-center ">
            {date && (
              <div className="font-header text-shoko-24 font-semibold text-shoko-text-75">{convertDate(date)}</div>
            )}
            <h1 className="text-center capitalize">{convertToProperName(title)}</h1>
          </div>
          {description && <div className="text-center text-shoko-18 font-semibold md:text-shoko-24">{description}</div>}
          <div className="flex flex-row items-center justify-between gap-x-2">
            <Link className="text-shoko-18 text-shoko-link md:text-shoko-24" to="/">
              Shoko
            </Link>
            <h4 className="text-shoko-18 text-shoko-text md:text-shoko-24">/</h4>
            {breadcrumbs.map((segment, index) => <Breadcrumb key={index} segment={segment} index={index} />)}
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default PageHero;
