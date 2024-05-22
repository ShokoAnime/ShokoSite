import { ReactNode, useMemo } from 'react';
import { ContributorsType } from '~/types/ContributorsType';
import UserCard from './UserCard';

type ContributorsGroupProps = {
  title: string;
  description: string | ReactNode;
  type: 'staff' | 'honorable' | 'contributors';
  data: ContributorsType[];
};

const ContributorsGroup = ({ title, description, type, data }: ContributorsGroupProps) => {
  const contributorsSorted = useMemo(() => {
    return data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }, [data]);

  const renderContributor = (contributor: ContributorsType) => {
    const { name, avatar_url, url, role, join_date, honorable } = contributor;

    const isStaff = type === 'staff' && join_date;
    const isHonorable = type === 'honorable' && honorable;
    const isContributor = type === 'contributors' && !join_date && !honorable;

    if (isStaff || isHonorable || isContributor) {
      return (
        <UserCard
          key={name}
          name={name}
          image={avatar_url}
          link={url}
          role={role}
          joinDate={join_date}
        />
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-y-16">
      <div className="flex flex-col gap-y-3">
        <h2>{title}</h2>
        <hr className="border-shoko-highlight w-[6.25rem] border" />
        <div>{description}</div>
      </div>

      <div className="flex flex-wrap gap-4">
        {contributorsSorted.map(renderContributor)}
      </div>
    </div>
  );
};

export default ContributorsGroup;
