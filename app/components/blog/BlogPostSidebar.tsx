import { mdiDownload, mdiMail, mdiTextBoxOutline } from '@mdi/js';
import { FaFacebook, FaPinterest, FaReddit } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

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
    <div className="flex w-full max-w-[18.125rem] flex-col gap-y-8">
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
        <div className="flex w-full gap-x-4">
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
  );
};

export default BlogPostSidebar;
