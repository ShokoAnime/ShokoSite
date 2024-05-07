import React, { useMemo } from 'react';
import { UserCard } from '~/components';

export interface Contributor {
  name: string;
  avatar_url: string;
  url: string;
  role?: string;
  join_date?: string;
  honorable?: boolean;
}

interface ContributorsGroupProps {
  title: string;
  description: string | React.ReactNode;
  type: string;
  data: Contributor[];
}

export const ContributorsGroup = ({ title, description, type, data }: ContributorsGroupProps) => {
  const contributorsSorted = useMemo(() => {
    return data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }, [data]);

  const renderContributor = ({ name, avatar_url, url, role, join_date, honorable }: Contributor) => {
    if (type === 'staff' && join_date) {
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

    if (type === 'honorable' && honorable) {
      return (
        <UserCard
          key={name}
          name={name}
          image={avatar_url}
          link={url}
        />
      );
    }

    if (type === 'contributors' && !join_date && !honorable) {
      return (
        <UserCard
          key={name}
          name={name}
          image={avatar_url}
          link={url}
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
