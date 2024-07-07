import { InfoSectionProps } from '~/types/home';
import Image from '~/components/common/Image';
import SectionHeader from '~/components/common/SectionHeader';
import InfoGroupDetails from './InfoGroups.data';

const InfoSection = ({ title, subtitle, image, content, reverse }: InfoSectionProps) => {
  return (
    <div
      // className={`flex items-end gap-x-16 ${reverse ? 'flex-row-reverse' : ''}`}
      className={`flex flex-wrap items-end gap-y-4 lg:gap-x-16 ${reverse ? 'xl:flex-row-reverse xl:flex-nowrap' : 'xl:flex-nowrap'}`}
    >
      <div className="flex max-w-[850px] flex-col gap-y-8">
        <div>
          <div className="text-shoko-text-header font-header text-xl font-semibold opacity-75">{subtitle}</div>
          <SectionHeader title={title} type="h2" />
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-4">{content}</div>
        </div>
      </div>
      <Image
        src={image}
        alt={title}
        // className="shadow-custom h-full max-h-[21.625rem] w-fit max-w-[38.125rem] rounded-lg"
        className="shadow-custom h-full xl:max-h-[21.625rem] w-full xl:w-fit xl:max-w-[38.125rem] rounded-lg"
      />
    </div>
  );
};

const InfoGroups = () => {
  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 py-16 2xl:px-0">
        <div className="flex flex-col items-center gap-y-16 2xl:gap-y-32">
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
