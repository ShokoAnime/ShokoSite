import { DatabaseZap, ExternalLink, PenLine, Puzzle, View } from 'lucide-react';
import SectionHeader from '~/components/common/SectionHeader';
import { SingleFeatureProps } from '~/types/home';

const featureList = [
  {
    icon: <DatabaseZap size={36} strokeWidth={1.25} />,
    title: 'Hash-Based Matching',
    description:
      'Hash your files and match them through AniDB, or any other release provider a plugin adds, for accurate episode and series identification.',
    descriptionLink: {
      text: 'Learn how files are identified.',
      link: 'https://docs.shokoanime.com/shoko-server/concepts/recognized-and-unrecognized-files',
    },
  },
  {
    icon: <Puzzle size={36} strokeWidth={1.25} />,
    title: 'Plugins',
    description:
      'Extend Shoko with plugins for metadata sources, release providers, renamers and more, installed right from the Web UI.',
  },
  {
    icon: <View size={36} strokeWidth={1.25} />,
    title: 'Sync Watch States',
    description:
      'Automatically track, sync and update watch states for the anime you watch with AniDB\'s MyList, your media players and any service a plugin adds.',
  },
  {
    icon: <PenLine size={36} strokeWidth={1.25} />,
    title: 'File Management',
    description:
      'Manage duplicate, missing, or corrupted files. Automatically rename and move files utilizing metadata and renaming plugins.',
  },
];

const SingleFeature = ({ icon, title, description, descriptionLink }: SingleFeatureProps) => {
  return (
    <div className="flex max-w-[330px] flex-col gap-4 text-center 2xl:text-start">
      <div className="flex items-center justify-center gap-x-3 2xl:justify-start">
        {icon}
        <div className="text-shoko-18 font-semibold">
          {title}
        </div>
      </div>
      <div>
        {description}
        {descriptionLink && (
          <a
            href={descriptionLink.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-x-2 text-shoko-link hover:text-shoko-link-hover 2xl:justify-start"
          >
            {descriptionLink.text}
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="flex flex-col items-center">
      <SectionHeader title="Collection Management Simplified" type="h2" center={true} />
      <div className="mt-6 max-w-[700px] text-center">
        Let Shoko, an open-source, cross-platform anime collection management system automate and organize your
        collection so you can spend more time watching.
      </div>
      <div className="mt-16 flex flex-wrap justify-center gap-6 2xl:flex-nowrap">
        {featureList.map((feature) => (
          <SingleFeature
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            descriptionLink={feature.descriptionLink}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
