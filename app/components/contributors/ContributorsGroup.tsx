import { useMemo } from 'react';

import { ContributorsGroupProps, ContributorsProps } from '~/types/contributors';
import SectionHeader from '~/components/common/SectionHeader';
import UserCard from '../common/UserCard';

const ContributorsGroup = ({ title, description, position, data }: ContributorsGroupProps) => {
  const contributorsSorted = useMemo(() => {
    return data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }, [data]);

  const renderContributor = (contributor: ContributorsProps) => {
    const { name, avatar_url, url, role, join_date, honorable } = contributor;

    const isStaff = position === 'staff' && join_date;
    const isHonorable = position === 'honorable' && honorable;
    const isContributor = position === 'contributors' && !join_date && !honorable;

    if (isStaff || isHonorable || isContributor) {
      return (
        <UserCard
          position="contributors"
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
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-3">
        <SectionHeader title={title} type="h2" />
        <div>{description}</div>
      </div>

      <div className="flex flex-wrap gap-4">
        {contributorsSorted.map(renderContributor)}
      </div>
    </div>
  );
};

export default ContributorsGroup;
