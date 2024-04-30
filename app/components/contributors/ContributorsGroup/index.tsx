import React from 'react';
import { UserCard } from '~/components';
import contributors from '~/data/contributors.json';

interface ContributorsGroupProps {
  title: string;
  description: string | React.ReactNode;
  type: string;
}

export const ContributorsGroup = ({ title, description, type }: ContributorsGroupProps) => {
  const contributorsSorted = contributors.sort((a, b) => {
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
  });

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
