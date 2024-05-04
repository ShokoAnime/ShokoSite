import { useEffect, useState } from 'react';
import { Footer, Header, Loading, PageBanner } from '~/components';

interface Contributor {
  join_date?: string;
  honorable?: boolean;
}

export default function Contributors() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const staff = data.filter((contributor: Contributor) => contributor.join_date).length;
  const honorableMentions = data.filter((contributor: Contributor) => contributor.honorable).length;
  const contributorsLength = data.length - staff - honorableMentions;

  useEffect(() => {
    const fetchData = () => {
      fetch('/data/contributors.json')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch((error) => {
          console.error('Failed to fetch tab data:', error);
          setData([]);
          setIsLoading(false);
        });
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <PageBanner
        title="Contributors"
        description="From the Shoko team itself to our everyday users, everyone listed below has contributed to making Shoko better."
      />

      <div className="mx-auto flex min-h-[calc(100vh-557px)] max-w-[1440px] flex-col gap-y-16 p-16 2xl:px-0 2xl:py-16">
        {isLoading ? <Loading /> : (
          <>
            <ContributorsGroup
              title="Shoko Staff"
              type="staff"
              description="These are the people who have actively contributed to the project, eventually becoming staff members."
              data={data}
            />

            <ContributorsGroup
              title="Honorable Mentions"
              type="honorable"
              data={data}
              description="From former staff members to users who have put in significant work, these are the people who have left their mark on Shoko."
            />

            <ContributorsGroup
              title="Contributors"
              type="contributors"
              data={data}
              description={
                <>
                  <div>
                    The <strong>{contributorsLength}</strong>{' '}
                    amazing users who contributed to the betterment of Shoko. Contributed in the past but don’t see your
                    name?{' '}
                    <a
                      className="font-medium text-link-light underline dark:text-link-dark"
                      href="/"
                      target="_blank"
                      rel="noopener"
                    >
                      Lets fix that.
                    </a>
                  </div>
                </>
              }
            />
          </>
        )}
      </div>

      <Footer altBackground={true} />
    </>
  );
}

import { ContributorsGroup } from '~/components/contributors/ContributorsGroup';
