import HighLightHeader from '~/components/common/HighLightHeader';
import { BlogPostProps } from '~/types/BlogTypes';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';
import { mdiDownload, mdiMail, mdiTextBoxOutline } from '@mdi/js';
import { FaFacebook, FaPinterest, FaReddit } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useLocation } from '@remix-run/react';
import { convertToProperName } from '~/helpers/utils';

type BlogDetailSidebar = {
  data: BlogPostProps;
};

type DownloadChangelog = {
  title: string;
  href: string;
};

const BlogListSidebar = ({ data }: BlogDetailSidebar) => {
  const animeUrl = `https://anidb.net/anime/?adb.search=${data.frontmatter.anime}`;
  // @ts-expect-error - Workaround for the type error.
  const downloadItem: DownloadChangelog = data.frontmatter.download;
  // @ts-expect-error - Workaround for the type error.
  const changelogItem: DownloadChangelog = data.frontmatter.changelog;
  const location = useLocation();
  const title = convertToProperName(data.frontmatter.title);
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
    <div className="bg-shoko-bg-alt flex w-[28.125rem] flex-col gap-y-8 rounded-lg p-8">
      <div className="flex flex-col items-start gap-y-6 text-base">
        <HighLightHeader title="Post Information" />
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <div className="text-shoko-text-header">Posted On</div>
            <div className="text-shoko-text font-normal">{data.frontmatter.date}</div>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="text-shoko-text-header">Banner Anime</div>
            <a
              className="text-shoko-link font-semibold"
              target="_blank"
              rel="nofollow noreferrer"
              href={animeUrl}
            >
              {data.frontmatter.anime}
            </a>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="text-shoko-text-header">Tags</div>
            <div className="text-shoko-text flex flex-wrap font-normal">
              {data.frontmatter.tags.map((tag: string, index: number) => {
                return (
                  <div key={tag} className="text-shoko-highlight font-medium">
                    {index !== data.frontmatter.tags.length - 1 ? `${tag},\u00A0` : tag}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {(downloadItem !== undefined || changelogItem !== undefined) && (
          <>
            <HighLightHeader title="Links" />
            <div className="flex w-full flex-col gap-y-4">
              {downloadItem !== undefined && (
                <>
                  <Button buttonType="primary">
                    <Icon icon={mdiDownload} />
                    <div>{downloadItem.title}</div>
                  </Button>
                </>
              )}
              {changelogItem !== undefined && (
                <>
                  <Button buttonType="secondary">
                    <Icon icon={mdiTextBoxOutline} />
                    <div>{changelogItem.title}</div>
                  </Button>
                </>
              )}
            </div>
          </>
        )}

        <div className="flex flex-col items-start gap-y-6 text-base">
          <HighLightHeader title="Share" />
          <div className="flex w-full gap-x-4">
            {shareLinks.map((link, index) => (
              <a key={index} href={link.link} target="_blank" rel="noreferrer">
                <Button buttonType="share">
                  {link.icon}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListSidebar;
