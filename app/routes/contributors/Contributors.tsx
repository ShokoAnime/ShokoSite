import contributorsData from '~/data/contributors.json';
import PageBanner from '~/components/layout/PageBanner';
import ContributorsGroup from '~/components/contributors/ContributorsGroup';

import type { Contributor } from '~/components/contributors/ContributorsGroup';

const data = contributorsData as Contributor[];
const staff = data.filter((contributor) => contributor.join_date);
const honorableMentions = data.filter((contributor) => contributor.honorable);
const contributors = data.filter((contributor) => !contributor.join_date && !contributor.honorable);

function Contributors() {
  return (
    <>
      <PageBanner
        title="Contributors"
        description="From the Shoko team itself to our everyday users, everyone listed below has contributed to making Shoko better."
      />

      <div className="mx-auto flex min-h-[calc(100vh-557px)] max-w-[1440px] flex-col gap-y-16 p-16 2xl:px-0 2xl:py-16">
        <ContributorsGroup
          title="Shoko Staff"
          type="staff"
          description="These are the people who have actively contributed to the project, eventually becoming staff members."
          data={staff}
        />

        <ContributorsGroup
          title="Honorable Mentions"
          type="honorable"
          data={honorableMentions}
          description="From former staff members to users who have put in significant work, these are the people who have left their mark on Shoko."
        />

        <ContributorsGroup
          title="Contributors"
          type="contributors"
          data={contributors}
          description={
            <>
              <div>
                The <strong>{contributors.length}</strong>{' '}
                amazing users who contributed to the betterment of Shoko. Contributed in the past but don&apos;t see
                your name?{' '}
                <a className="text-shoko-link font-medium underline" href="/" target="_blank" rel="noopener">
                  Lets fix that.
                </a>
              </div>
            </>
          }
        />
      </div>
    </>
  );
}

export default Contributors;
