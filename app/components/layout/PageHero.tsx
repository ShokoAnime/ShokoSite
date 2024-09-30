import React, { useEffect, useState } from 'react';
import { Link, useLocation } from '@remix-run/react';
import { BreadcrumbProps, PageHeroProps } from '~/types/layout';
import { convertDate } from '~/lib/convertDate';
import { convertToProperName } from '~/lib/convertToProperName';
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
      <>
        <span className="mx-0.5 text-sm text-shoko-text sm:mx-1 sm:text-shoko-18 md:text-shoko-24">/</span>
        {isLastSegment
          ? (
            <span className="text-center text-sm font-semibold text-shoko-text sm:text-shoko-18 md:text-shoko-24">
              {formattedSegment}
            </span>
          )
          : (
            <Link
              className="text-center text-sm text-shoko-link hover:underline sm:text-shoko-18 md:text-shoko-24"
              to={path}
            >
              {formattedSegment}
            </Link>
          )}
      </>
    );
  };

  return (
    <div className="mt-8 flex flex-col gap-8 lg:mt-16 lg:gap-16">
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-12">
        <div className="flex max-w-[90%] flex-col items-center justify-center gap-y-4 sm:max-w-[850px]">
          <div className="flex flex-col items-center justify-center gap-1">
            {date && (
              <div className="font-header text-lg font-semibold text-shoko-text-75 sm:text-xl md:text-2xl">
                {convertDate(date)}
              </div>
            )}
            <h1 className="text-center text-2xl capitalize sm:text-3xl md:text-4xl lg:text-5xl">
              {convertToProperName(title)}
            </h1>
          </div>
          {description && (
            <div className="text-center text-sm font-semibold sm:text-base md:text-lg">
              {description}
            </div>
          )}
          <div className="flex w-full flex-wrap items-center justify-center gap-x-0.5 gap-y-1 sm:gap-x-1">
            <Link className="text-sm text-shoko-link hover:underline sm:text-shoko-18 md:text-shoko-24" to="/">
              Shoko
            </Link>
            {breadcrumbs.map((segment, index) => <Breadcrumb key={index} segment={segment} index={index} />)}
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default PageHero;
