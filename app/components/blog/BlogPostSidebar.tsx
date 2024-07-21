import { mdiDownload, mdiMail, mdiTagMultiple, mdiTextBoxOutline } from '@mdi/js';
import { FaFacebook, FaPinterest, FaReddit } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import cx from 'classnames';

import { convertToProperName } from '~/helpers/helpers';
import { BlogDetail } from '~/types/blog';

import SectionHeader from '~/components/common/SectionHeader';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';

type BlogPostSidebar = {
  postData: BlogDetail;
};

const BlogPostSidebar = ({ postData }: BlogPostSidebar) => {
  const animeUrl = `https://anidb.net/anime/?adb.search=${postData.frontmatter.anime}`;
  const downloadItem = postData.frontmatter.download;
  const changelogItem = postData.frontmatter.changelog;
  // const location = useLocation();
  const title = convertToProperName(postData.frontmatter.title);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(`https://shokoanime.com/${location.pathname}`);

  const shareLinks = [
    {
      icon: <FaReddit size={24} />,
      link: `https://www.reddit.com/submit?title=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      icon: <FaXTwitter size={24} />,
      link: `https://x.com/share?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      icon: <FaFacebook size={24} />,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      icon: <FaPinterest size={24} />,
      link: `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    },
    {
      icon: <Icon icon={mdiMail} />,
      link: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  return (
    <>
      <div className="hidden border-shoko-border lg:flex w-fit max-w-64 flex-col flex-wrap gap-y-8 border-r border-solid pr-12">
        <div className="flex flex-col gap-y-6">
          <SectionHeader title="Post Information" type="h4" />
          <div className="flex flex-col gap-y-1">
            <div className="font-header font-medium">Posted On</div>
            <div className="font-body">{postData.frontmatter.date}</div>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="font-header font-medium">Banner Anime</div>
            <a
              className="font-body text-shoko-link"
              href={animeUrl}
              target="_blank"
              rel="noreferrer"
            >
              {postData.frontmatter.anime}
            </a>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="font-header font-medium">Tags</div>
            <div className="text-shoko-text flex flex-wrap font-normal">
              {postData.frontmatter.tags.sort().map((tag: string, index: number) => {
                return (
                  <div key={tag} className="text-shoko-highlight font-medium">
                    {index !== postData.frontmatter.tags.length - 1 ? `${tag},\u00A0` : tag}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {(downloadItem !== undefined || changelogItem !== undefined) && (
          <>
            <SectionHeader title="Links" type="h4" />
            <div className="flex w-full flex-col gap-y-2">
              {downloadItem !== undefined && (
                <>
                  <Button buttonType="primary" className="!p-3">
                    <Icon icon={mdiDownload} />
                    <div>{downloadItem.title}</div>
                  </Button>
                </>
              )}
              {changelogItem !== undefined && (
                <>
                  <Button buttonType="secondary" className="!p-3">
                    <Icon icon={mdiTextBoxOutline} />
                    <div>{changelogItem.title}</div>
                  </Button>
                </>
              )}
            </div>
          </>
        )}

        <div className="flex flex-col items-start gap-y-6 text-base">
          <SectionHeader title="Share" type="h4" />
          <div className="flex w-full flex-wrap gap-4">
            {shareLinks.map((link, index) => (
              <a key={index} href={link.link} target="_blank" rel="noreferrer">
                <Button buttonType="circle" className="size-[2.8rem]">
                  {link.icon}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-2 items-baseline border-b lg:hidden'>
        <span className='md:order-1'>Banner:  <a
          className="font-body text-shoko-link"
          href={animeUrl}
          target="_blank"
          rel="noreferrer"
        >
          {postData.frontmatter.anime}
        </a></span>

        <div className="flex gap-1 md:justify-end order-4 md:order-2">
          {shareLinks.map((link, index) => (
            <a key={index} href={link.link} target="_blank" rel="noreferrer">
              <Button buttonType="circle" className="size-[2.8rem]">
                {link.icon}
              </Button>
            </a>
          ))}
        </div>
        <div className="flex gap-x-2 md:order-3">
          <Icon className="text-shoko-highlight font-medium" icon={mdiTagMultiple} />
          <div className="flex flex-wrap gap-x-2">
            {postData.frontmatter.tags.sort().map((tag, index, arr) => (
              <div
                key={tag}
                className="text-shoko-highlight font-medium text-sm xl:text-xl"
              >
                {tag}
                {index !== arr.length - 1 && ' |'}
              </div>
            ))}
          </div>
        </div>
        <div className="flex font-body mr-1 md:justify-end order-1 md:order-4">Posted on: {postData.frontmatter.date}</div>
      </div>
    </>
  );
};

export default BlogPostSidebar;
