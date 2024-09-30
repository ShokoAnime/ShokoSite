import { SingleInfoProps } from '~/types/home';
import cx from 'classnames';
import SectionHeader from '~/components/common/SectionHeader';
import Image from '~/components/common/Image';

const InfoDetails = [
  {
    title: 'Why Use Shoko?',
    subtitle: 'Effortless Organization',
    image: '/images/home/web-ui-series.jpg',
    description: (
      <>
        <div>
          Shoko streamlines your anime collection by hashing your files and matching them against AniDB’s comprehensive
          database. It automatically fills your collection with detailed information about each series and episode,
          while also pulling in metadata from other sources. With Shoko managing the setup and organization, you can
          focus on what really matters—choosing your next anime to watch.
        </div>
        <strong>
          Please be aware that Shoko does not offer any means to download files, stream files from streaming sites, or
          access files that are not part of your personal collection.
        </strong>
      </>
    ),
  },
  {
    title: 'Advanced Management Tools',
    subtitle: 'Streamlined File Maintenance',
    image: '/images/home/web-ui-release-management.jpg',
    description: (
      <>
        <div>
          Shoko provides robust tools for maintaining your anime collection. Detect and manage duplicate, missing, or
          corrupted files effortlessly. Automatically rename and move files using metadata and custom plugins. Easily
          link unrecognized files to correct entries. With support for multiple TMDB links per series, Shoko ensures
          your collection stays organized and accurate.
        </div>
      </>
    ),
  },
];

const SingleInfo = ({ title, subtitle, image, description, reverse }: SingleInfoProps) => {
  return (
    <div
      className={cx(
        'flex items-center gap-16',
        reverse ? 'flex-col 2xl:flex-row-reverse' : 'flex-col 2xl:flex-row',
      )}
    >
      <div className="flex max-w-[850px] flex-col gap-y-8 text-start">
        <SectionHeader title={title} subtitle={subtitle} type="h2" />
        <div className="flex gap-8">
          <div className="flex flex-col gap-4">{description}</div>
        </div>
      </div>
      <Image
        src={image}
        alt={title}
        className="h-full max-h-[21.625rem] w-fit rounded-lg shadow-custom lg:max-w-[38.125rem]"
        zoom={true}
      />
    </div>
  );
};

const infoGroups = () => {
  return (
    <div className="flex flex-col gap-16">
      {InfoDetails.map((infoGroup, index) => (
        <SingleInfo
          key={infoGroup.title}
          title={infoGroup.title}
          subtitle={infoGroup.subtitle}
          image={infoGroup.image}
          description={infoGroup.description}
          reverse={index % 2 !== 0}
        />
      ))}
    </div>
  );
};

export default infoGroups;
