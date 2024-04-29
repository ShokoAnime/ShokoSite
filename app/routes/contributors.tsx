import React from 'react';
import contributors from '~/data/contributors.json';
import { Footer, Header, PageBanner, UserCard } from '~/components';

export default function Contributors() {
  const contributorsSorted = contributors.sort((a, b) => {
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
  });

  return (
    <>
      <Header />
      <PageBanner
        title='Contributors'
        description='From the Shoko team itself to our everyday users, everyone listed below has contributed to making Shoko better.'
      />
      <div className='flex flex-col gap-y-16 p-16'>
        <div className='mx-auto flex max-w-[1440px] flex-1 flex-col gap-y-16'>
          <div className='flex flex-col gap-y-3'>
            <h2>Shoko Staff</h2>
            <hr className='w-[6.25rem] border border-highlight-light dark:border-highlight-dark' />
            <div>These are the people who have actively contributed to the project, eventually becoming staff members.</div>
          </div>

          <div className='flex flex-wrap gap-4'>
            {contributorsSorted.map(
              (contributor) =>
                contributor.join_date && (
                  <UserCard
                    key={contributor.name}
                    name={contributor.name}
                    image={contributor.avatar_url}
                    link={contributor.url}
                    role={contributor.role}
                    joinDate={contributor.join_date}
                  />
                )
            )}
          </div>
        </div>

        <div className='mx-auto flex max-w-[1440px] flex-1 flex-col gap-y-16'>
          <div className='flex flex-col gap-y-3'>
            <h2>Contributors</h2>
            <hr className='w-[6.25rem] border border-highlight-light dark:border-highlight-dark' />
            <div>
              The <strong>{contributors.length}</strong> amazing users who contributed to the betterment of Shoko. Contributed in the past
              but don’t see your name? Lets fix that.
            </div>
          </div>

          <div className='flex flex-wrap gap-4'>
            {contributorsSorted.map(
              (contributor) =>
                !contributor.join_date && (
                  <UserCard key={contributor.name} name={contributor.name} image={contributor.avatar_url} link={contributor.url} />
                )
            )}
          </div>
        </div>
      </div>

      <Footer altBackground={true} />
    </>
  );
}
