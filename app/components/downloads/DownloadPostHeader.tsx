import { FaDiscord, FaGithub } from 'react-icons/fa';
import { mdiBookOpenOutline, mdiClockEditOutline } from '@mdi/js';

import { IconName } from '~/types/downloads';

import SectionHeader from '~/components/common/SectionHeader';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';

type DownloadHeaderProps = {
  title: string;
  resources: {
    name: string;
    url: string;
  }[];
};

const DownloadPostHeader = ({ title, resources }: DownloadHeaderProps) => {
  const iconName: IconName = {
    discord: <FaGithub size={24} />,
    github: <FaDiscord size={24} />,
    changelog: mdiClockEditOutline,
    docs: mdiBookOpenOutline,
  };

  return (
    <div className="flex items-center justify-between">
      <SectionHeader title={title} type="h4" />
      <div className="hidden md:flex gap-x-2">
        {resources.map((resource) => (
          <a key={resource.name} className="text-sm" href={resource.url} target="_blank" rel="noreferrer">
            <Button className="px-3 py-2" buttonType="outline">
              <Icon icon={iconName[resource.name.toLowerCase()]} />
              {resource.name}
            </Button>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DownloadPostHeader;
