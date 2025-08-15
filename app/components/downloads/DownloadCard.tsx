import { Link } from '@remix-run/react';
import { convertNameToUrl } from '~/lib/convertNameToUrl';
import Image from '~/components/common/Image';
import { ContentItem } from '~/types/content';
import { sanitizeContent } from '~/lib/sanitizeContent';

type DownloadCardProps = {
  data: ContentItem;
};

const DownloadCard = ({ data }: DownloadCardProps) => {
  return (
    <div className="flex size-full max-w-[310px] flex-col gap-6 xl:max-w-[335px]">
      <div className="group relative">
        <Image
          src={data.meta.images[0].url}
          alt={data.meta.images[0].alt}
          className="size-full h-[186px] rounded-lg object-cover shadow-custom transition-opacity duration-300 group-hover:opacity-75"
        />
        <Link to={convertNameToUrl(data.meta.name)}>
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-900/75 font-body text-shoko-24 text-shoko-text opacity-0 transition-opacity duration-300 hover:border hover:border-shoko-link group-hover:opacity-100">
            View Download →
          </div>
        </Link>
      </div>
      <div>
        {data.meta.tags
          ? (
            <div className="text-shoko-14 font-semibold text-shoko-text-75">
              {data.meta.tags.map((tag: string, index: number, arr: []) => (
                <span key={tag}>
                  {tag}
                  {index !== arr.length - 1 && ', '}
                </span>
              ))}
            </div>
          )
          : (
            <div className="text-shoko-14 font-semibold text-shoko-text-75">
              {data.meta.downloads[0].links[0].name}
            </div>
          )}
        <div className="font-header text-shoko-18 font-bold">{data.meta.name}</div>
      </div>

      <div className="line-clamp-3">{sanitizeContent(data.content)}</div>
      <div className="flex justify-between">
        {data.meta.tags
          ? (
            <div>
              <div className="text-shoko-14 font-semibold text-shoko-text-75">Author</div>
              <div className="text-shoko-14 font-semibold">{data.meta.author}</div>
            </div>
          )
          : (
            <div>
              <div className="text-shoko-14 font-semibold text-shoko-text-75">Version</div>
              <div className="text-shoko-14 font-semibold">{data.meta.version}</div>
            </div>
          )}
        <div>
          <div className="text-shoko-14 font-semibold text-shoko-text-75">Updated On</div>
          <div className="text-shoko-14 font-semibold">{data.meta.date}</div>
        </div>
      </div>
      {/*<Button buttonType="primary">*/}
      {/*  <Download />*/}
      {/*  View Download*/}
      {/*</Button>*/}
    </div>
  );
};

export default DownloadCard;
