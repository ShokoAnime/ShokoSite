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
        <div className="flex w-full max-w-[145px] items-center justify-center md:max-w-[167px] lg:max-w-[181px] xl:max-w-[184px]">
          <UserCard
            position="contributors"
            key={name}
            name={name}
            image={avatar_url}
            link={url}
            role={role}
            joinDate={join_date}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mt-8 flex flex-col gap-8 lg:mt-16">
      <div className="flex flex-col gap-y-3">
        <SectionHeader title={title} type="h2" />
        <div className="flex text-center lg:text-start">{description}</div>
      </div>

      <div className="flex flex-wrap gap-4">
        {contributorsSorted.map(renderContributor)}
      </div>
    </div>
  );
};

export default ContributorsGroup;
