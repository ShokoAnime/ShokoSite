import { InfoSectionProps } from '~/types/home';
import Image from '~/components/common/Image';
import SectionHeader from '~/components/common/SectionHeader';
import InfoGroupDetails from './InfoGroups.data';
import cx from 'classnames';
import { useMobile } from '~/hooks/useMobile';

const InfoSection = ({ title, subtitle, image, content, reverse }: InfoSectionProps) => {
  const { isMobile } = useMobile();

  return (
    <div
      className={cx(
        'flex items-center gap-16',
        reverse || isMobile ? 'flex-col-reverse xl:flex-row-reverse' : 'xl:flex-row',
      )}
    >
      <div className="flex max-w-[850px] flex-col gap-y-8">
        <div>
          <div
            className={cx(
              'flex font-header text-base font-semibold text-shoko-text-header opacity-75 xl:text-xl',
              isMobile && 'justify-center',
            )}
          >
            {subtitle}
          </div>
          <SectionHeader title={title} type="h2" center={isMobile} />
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-4">{content}</div>
        </div>
      </div>
      <Image
        src={image}
        alt={title}
        className="h-full max-h-[21.625rem] w-fit rounded-lg shadow-custom lg:max-w-[38.125rem]"
      />
    </div>
  );
};

const InfoGroups = () => {
  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 py-16 2xl:px-0">
        <div className="flex flex-col items-center gap-y-16 text-center sm:text-left 2xl:gap-y-32">
          {InfoGroupDetails.map((infoGroup, index) => (
            <InfoSection
              key={infoGroup.title}
              title={infoGroup.title}
              subtitle={infoGroup.subtitle}
              image={infoGroup.image}
              content={infoGroup.content}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default InfoGroups;
