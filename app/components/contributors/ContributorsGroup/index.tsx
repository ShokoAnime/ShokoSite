import React, { useEffect, useState } from 'react';
import { UserCard } from '~/components';

interface Contributor {
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
  const [contributorsSorted, setContributorsSorted] = useState<Contributor[]>([]);

  useEffect(() => {
    setContributorsSorted(data.sort((a, b) => {
      return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
    }));
  }, [data]);

  return (
    <div className="flex flex-col gap-y-16">
      <div className="flex flex-col gap-y-3">
        <h2>{title}</h2>
        <hr className="w-[6.25rem] border border-highlight-light dark:border-highlight-dark" />
        <div>
          {description}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {contributorsSorted.map((contributor) =>
          type === 'staff' && contributor.join_date
            ? (
              <UserCard
                key={contributor.name}
                name={contributor.name}
                image={contributor.avatar_url}
                link={contributor.url}
                role={contributor.role}
                joinDate={contributor.join_date}
              />
            )
            : type === 'honorable' && contributor.honorable
            ? (
              <UserCard
                key={contributor.name}
                name={contributor.name}
                image={contributor.avatar_url}
                link={contributor.url}
              />
            )
            : type === 'contributors' && !contributor.join_date && !contributor.honorable
            ? (
              <UserCard
                key={contributor.name}
                name={contributor.name}
                image={contributor.avatar_url}
                link={contributor.url}
              />
            )
            : []
        )}
      </div>
    </div>
  );
};
