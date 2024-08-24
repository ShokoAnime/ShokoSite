import { mdiDownload, mdiMail, mdiTextBoxOutline } from '@mdi/js';
import { FaFacebook, FaPinterest, FaReddit } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import { convertToProperName } from '~/helpers/helpers';
import { BlogDetail } from '~/types/blog';

import SectionHeader from '~/components/common/SectionHeader';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';
import { useMobile } from '~/hooks/useMobile';

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

  const { isMobile } = useMobile();

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
    <div className="mx-auto mb-4 flex w-fit max-w-fit flex-col flex-wrap gap-6 border-b border-solid border-shoko-border pr-0 md:mx-0 md:flex-row lg:flex-col lg:gap-8 lg:border-r lg:pr-12">
      <div className="flex w-full flex-col gap-6">
        <SectionHeader title="Post Information" type="h4" center={isMobile} />
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full flex-col gap-y-1 text-center md:w-1/3 lg:w-full lg:text-left">
            <div className="font-header font-medium">Posted On</div>
            <div className="font-body">{postData.frontmatter.date}</div>
          </div>
          <div className="flex w-full flex-col gap-y-1 text-center md:w-1/3 lg:w-full lg:text-left">
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
          <div className="flex w-full flex-col gap-y-1 text-center md:w-1/3 lg:w-full lg:text-left">
            <div className="font-header font-medium">Tags</div>
            <div className="mx-auto flex flex-wrap justify-center font-normal text-shoko-text">
              {postData.frontmatter.tags.sort().map((tag: string, index: number) => {
                return (
                  <div key={tag} className="font-medium text-shoko-highlight">
                    {index !== postData.frontmatter.tags.length - 1 ? `${tag},\u00A0` : tag}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {(downloadItem !== undefined || changelogItem !== undefined) && (
        <div className="flex w-full flex-col gap-6">
          <SectionHeader title="Links" type="h4" center={isMobile} />
          <div className="flex w-full flex-col gap-2 md:flex-row lg:flex-col">
            {downloadItem !== undefined && (
              <>
                <Button buttonType="primary" className="w-full !p-3">
                  <Icon icon={mdiDownload} />
                  <div className="text-sm xl:text-base">{downloadItem.title}</div>
                </Button>
              </>
            )}
            {changelogItem !== undefined && (
              <>
                <Button buttonType="secondary" className="w-full !p-3">
                  <Icon icon={mdiTextBoxOutline} />
                  <div className="text-sm xl:text-base">{changelogItem.title}</div>
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex w-full flex-col gap-6 text-base">
        <SectionHeader title="Share" type="h4" center={isMobile} />
        <div className="flex w-full flex-wrap justify-center gap-4 pb-6 lg:justify-start">
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
