import Button from '~/components/common/Button';
import { Download } from 'lucide-react';
import { Link } from '@remix-run/react';
import { convertNameToUrl } from '~/helpers/helpers';
import { MarkdownFile } from '~/types/markdown';
import Image from '~/components/common/Image';

type DownloadCardProps = {
  data: MarkdownFile;
};

const DownloadCard = ({ data }: DownloadCardProps) => {
  return (
    <div className="flex size-full max-w-[330px] flex-col gap-6">
      <div className="group relative">
        <Image
          src={data.frontmatter.images[0].url}
          alt={data.frontmatter.images[0].alt}
          className="size-full h-[186px] rounded-lg object-cover shadow-custom transition-opacity duration-300 group-hover:opacity-75"
        />
        <Link to={convertNameToUrl(data.frontmatter.name)}>
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-900/75 font-body text-shoko-24 text-shoko-text opacity-0 transition-opacity duration-300 hover:border hover:border-shoko-link group-hover:opacity-100">
            View Download →
          </div>
        </Link>
      </div>
      <div>
        {data.frontmatter.tags
          ? (
            <div className="text-shoko-14 font-semibold text-shoko-text-75">
              {data.frontmatter.tags.map((tag, index, arr) => (
                <span key={tag}>
                  {tag}
                  {index !== arr.length - 1 && ', '}
                </span>
              ))}
            </div>
          )
          : (
            <div className="text-shoko-14 font-semibold text-shoko-text-75">
              {data.frontmatter.downloads[0].links[0].name}
            </div>
          )}
        <div className="font-header text-shoko-18 font-bold">{data.frontmatter.name}</div>
      </div>
      <div className="line-clamp-3">{data.description}</div>
      <div className="flex justify-between">
        {data.frontmatter.tags
          ? (
            <div>
              <div className="text-shoko-14 font-semibold text-shoko-text-75">Author</div>
              <div className="text-shoko-14 font-semibold">{data.frontmatter.author}</div>
            </div>
          )
          : (
            <div>
              <div className="text-shoko-14 font-semibold text-shoko-text-75">Version</div>
              <div className="text-shoko-14 font-semibold">Version {data.frontmatter.version}</div>
            </div>
          )}
        <div>
          <div className="text-shoko-14 font-semibold text-shoko-text-75">Updated On</div>
          <div className="text-shoko-14 font-semibold">{data.frontmatter.date}</div>
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
