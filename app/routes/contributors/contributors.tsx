import ContributorsGroup from '~/components/contributors/ContributorsGroup';
import { contributors, honorable, staff } from '~/data/contributors';
import PageHero from '~/components/layout/PageHero';

function Contributors() {
  return (
    <>
      <PageHero
        title="Contributors"
        description="From the Shoko team itself to our everyday users, everyone listed below has contributed to making Shoko better."
      />
      <div className="mx-auto mb-16 flex flex-col gap-16">
        <ContributorsGroup
          title="Shoko Staff"
          position="staff"
          description="These are the people who have actively contributed to the project, eventually becoming staff members."
          data={staff}
        />

        <ContributorsGroup
          title="Honorable Mentions"
          position="honorable"
          data={honorable}
          description="From former staff members to users who have put in significant work, these are the people who have left their mark on Shoko."
        />

        <ContributorsGroup
          title="Contributors"
          position="contributors"
          data={contributors}
          description={
            <>
              <div>
                The <strong>{contributors.length}</strong>{' '}
                amazing users who contributed to the betterment of Shoko. Contributed in the past but don&apos;t see
                your name?{' '}
                <a className="font-semibold text-shoko-link underline" href="/" target="_blank" rel="noopener">
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
