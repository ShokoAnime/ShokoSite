import HighLightHeader from '~/components/common/HighLightHeader';
import { BlogPostProps } from '~/types/BlogTypes';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';
import { mdiDownload, mdiMail, mdiTextBoxOutline } from '@mdi/js';
import { FaFacebook, FaPinterest, FaReddit } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

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
            <Button buttonType="share">
              <FaReddit size={24} />
            </Button>
            <Button buttonType="share">
              <FaXTwitter size={24} />
            </Button>
            <Button buttonType="share">
              <FaFacebook size={24} />
            </Button>
            <Button buttonType="share">
              <FaPinterest size={24} />
            </Button>
            <Button buttonType="share">
              <Icon icon={mdiMail} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListSidebar;
