import { useLocation } from '@remix-run/react';
import { markdownDetail } from '~/helpers/markdown';
import { useEffect, useState } from 'react';

import { BlogDetail } from '~/types/blog';
import { contributors, honorable, staff } from '~/data/contributors';
import { ContributorsProps } from '~/types/contributors';

import BlogPostSidebar from '~/components/blog/BlogPostSidebar';
import BlogPostBanner from '~/components/blog/BlogPostBanner';
import PageNotFound from '~/components/layout/PageNotFound';
import SectionHeader from '~/components/common/SectionHeader';
import UserCard from '~/components/common/UserCard';

export default function BlogPost() {
  const [postData, setPostData] = useState<BlogDetail>();
  const [contributorData, setContributorData] = useState<ContributorsProps[]>([]);
  const location = useLocation();

  useEffect(() => {
    const getPostInfo = async () => {
      const data = await markdownDetail(location.pathname);
      // @ts-expect-error - data is not undefined.
      setPostData(data);
    };
    getPostInfo();
  }, []);

  useEffect(() => {
    if (!postData?.frontmatter.devs) return;

    const buildContributors = () => {
      // @ts-expect-error - postData is checked for undefined above.
      const data: ContributorsProps[] = postData.frontmatter.devs.map((dev) => {
        const devLower = dev.toLowerCase();
        const isStaff = staff.some((person) => devLower === person.name.toLowerCase());
        const isContributor = contributors.some((person) => devLower === person.name.toLowerCase());
        const isHonorable = honorable.some((person) => devLower === person.name.toLowerCase());

        let avatar_url = '';
        let url = '';

        if (isStaff) {
          const person = staff.find((person) => devLower === person.name.toLowerCase());
          avatar_url = person?.avatar_url || '';
          url = person?.url || '';
        } else if (isContributor) {
          const person = contributors.find((person) => devLower === person.name.toLowerCase());
          avatar_url = person?.avatar_url || '';
          url = person?.url || '';
        } else if (isHonorable) {
          const person = honorable.find((person) => devLower === person.name.toLowerCase());
          avatar_url = person?.avatar_url || '';
          url = person?.url || '';
        } else {
          avatar_url = 'NA';
          url = '';
        }

        return {
          name: dev,
          avatar_url,
          url,
        };
      });

      setContributorData(data);
    };

    buildContributors();
  }, [postData]);

  // If the post data is still loading, return null.
  if (postData === undefined) return null;

  // If the post is not found, return a 404 page.
  if (postData === null) return <PageNotFound />;

  return (
    <div className="h-full min-h-[calc(100vh-557px)] px-0 lg:px-6">
      <BlogPostBanner title={postData.frontmatter.title} image={postData.frontmatter.image} />
      <div className="my-16 flex flex-col justify-center gap-x-16 px-6 lg:flex-row lg:px-0">
        <BlogPostSidebar postData={postData} />
        <div className="flex flex-col gap-y-6">
          <div className="shoko-post flex w-full max-w-[850px] flex-col gap-y-6">{postData.description}</div>
          {postData.frontmatter.devs && (
            <div className="flex flex-col gap-y-4">
              <SectionHeader title="Contributors" type="h4" />
              <div>This release was made possible by the following people.</div>
              <div className="flex w-full max-w-[850px] flex-wrap gap-4">
                {contributorData.map((contributor) => (
                  <UserCard
                    key={contributor.name}
                    className="w-full max-w-[12.5rem]"
                    name={contributor.name}
                    image={contributor.avatar_url}
                    link={contributor.url}
                    position="downloads"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
