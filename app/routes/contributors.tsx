import contributors from '~/data/contributors.json';
import { Footer, Header, PageBanner } from '~/components';
import { ContributorsGroup } from '~/components/contributors/ContributorsGroup';

export default function Contributors() {
  const staff = contributors.filter((contributor) => contributor.join_date).length;
  const honorableMentions = contributors.filter((contributor) => contributor.honorable).length;
  const contributorsLength = contributors.length - staff - honorableMentions;

  return (
    <>
      <Header />
      <PageBanner
        title="Contributors"
        description="From the Shoko team itself to our everyday users, everyone listed below has contributed to making Shoko better."
      />

      <div className="mx-auto flex max-w-[1440px] flex-col gap-y-16 p-16 2xl:px-0 2xl:py-16">
        <ContributorsGroup
          title="Shoko Staff"
          type="staff"
          description="These are the people who have actively contributed to the project, eventually becoming staff members."
        />

        <ContributorsGroup
          title="Honorable Mentions"
          type="honorable"
          description="From former staff members to users who have put in significant work, these are the people who have left their mark on Shoko."
        />

        <ContributorsGroup
          title="Contributors"
          type="contributors"
          description={
            <>
              <div>
                The <strong>{contributorsLength}</strong>{' '}
                amazing users who contributed to the betterment of Shoko. Contributed in the past but don’t see your
                name?{' '}
                <a className="font-medium text-link-light underline dark:text-link-dark" href="/">Lets fix that.</a>
              </div>
            </>
          }
        />
      </div>

      <Footer altBackground={true} />
    </>
  );
}
