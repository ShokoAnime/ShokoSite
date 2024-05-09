import React from 'react';
import InfoGroupDetails from './InfoGroups.data';

type InfoSectionProps = {
  title: string;
  content: React.ReactNode;
  image: string;
  reverse: boolean;
};

const InfoSection = ({ title, image, content, reverse }: InfoSectionProps) => {
  return (
    <>
      {/* Only shown when min-width <= 1280 */}
      <div className="inline-flex max-w-[850px] flex-col gap-y-2 2xl:hidden">
        <h2>{title}</h2>
        <hr className="border-shoko-highlight mx-auto flex w-[100px] border" />
      </div>
      <div
        className={`flex items-center gap-x-16 ${reverse ? 'flex-row-reverse' : ''}`}
      >
        <div className="flex max-w-[850px] flex-col gap-y-8">
          <div className="hidden flex-col gap-y-2 2xl:inline-flex">
            <h2>{title}</h2>
            <hr className="border-shoko-highlight w-[100px] border" />
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-4">{content}</div>
          </div>
        </div>
        <img className="shadow-custom rounded-lg" src={image} alt={title} width={611} />
      </div>
    </>
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
