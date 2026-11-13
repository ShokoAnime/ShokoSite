import ContributorsGroup from '~/components/contributors/ContributorsGroup';
import { contributors, honorable, staff } from '~/data/contributors';
import PageHero from '~/components/layout/PageHero';
import { MetaFunction } from 'react-router';
import { ogImageUrl, pageCards } from '~/lib/ogCard';

export const meta: MetaFunction = () => {
  const card = pageCards.contributors;
  const pageTitle = card.title;
  const pageDescription = card.summary;
  const ogImage = ogImageUrl('page', 'contributors', card);

  return [
    { title: pageTitle },
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: ogImage },
    { property: 'og:type', content: 'article' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: pageTitle },
    { property: 'twitter:description', content: pageDescription },
    { property: 'twitter:image', content: ogImage },
  ];
};

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
                <a
                  className="font-semibold text-shoko-link underline"
                  href="https://github.com/ShokoAnime/ShokoSite/issues/new/choose"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
