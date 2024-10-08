import { contributors, honorable, staff } from '~/data/contributors';
import UserCard from '~/components/common/UserCard';
import { PostContributorsProps } from '~/types/blog';
import SectionHeader from '~/components/common/SectionHeader';

const PostContributors = ({ devs }: PostContributorsProps) => {
  const combinedRaw = [...contributors, ...honorable, ...staff];
  const combinedProcessed = combinedRaw
    .filter(person => devs.some(dev => dev.toLowerCase() === person.name.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  return (
    <>
      <div className="flex flex-col gap-y-3">
        <SectionHeader className="items-center md:items-start" title="Contributors" type="h2" />
        <div>
          This release was made possible by the following {combinedProcessed.length === 1
            ? 'contributor.'
            : (
              <>
                <span className="font-semibold text-shoko-highlight">{combinedProcessed.length}</span> contributors.
              </>
            )}
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center gap-4">
        {combinedProcessed.map((person) => (
          <UserCard
            position="contributors"
            key={person.name}
            name={person.name}
            image={person.avatar_url}
            link={person.url}
            className="max-w-[157px]"
          />
        ))}
      </div>
    </>
  );
};

export default PostContributors;
