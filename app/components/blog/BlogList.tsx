import Icon from '~/components/common/Icon';
import { mdiArrowRight, mdiTagMultiple } from '@mdi/js';
import Button from '~/components/common/Button';
import { useNavigate } from 'react-router';
import cx from 'classnames';

type BlogPreviewProps = {
  title: string;
  date: Date;
  tags: string[];
  description: string;
  url: string;
  image: string;
  className?: string;
};

const items = [
  {
    title: 'Shoko Version 4.1.2 Released ',
    description: 'In July 2006, Iwerndly made his personal AniDB client, AniDB Monitor, available to the public. This handy client allowed AniDB members to easily hash their files for comparison, add them to their AniDB Mylist, and update their episode watched status with minimal effort. However, after achieving its initial objectives, the development of AniDB Monitor slowed down, and it remained inactive until 2008.',
    date: new Date(),
    tags: ['Shoko', 'Release', 'Web UI'],
    url: '#',
    image: '/images/blog/3.webp',
  },
  {
    title: 'Shoko Version 4.1.2 Released ',
    description: 'In July 2006, Iwerndly made his personal AniDB client, AniDB Monitor, available to the public. This handy client allowed AniDB members to easily hash their files for comparison, add them to their AniDB Mylist, and update their episode watched status with minimal effort. However, after achieving its initial objectives, the development of AniDB Monitor slowed down, and it remained inactive until 2008.',
    date: new Date(),
    tags: ['Shoko', 'Release', 'Web UI'],
    url: '#',
    image: '/images/blog/3.webp',
  },
  {
    title: 'Shoko Version 4.1.2 Released ',
    description: 'In July 2006, Iwerndly made his personal AniDB client, AniDB Monitor, available to the public. This handy client allowed AniDB members to easily hash their files for comparison, add them to their AniDB Mylist, and update their episode watched status with minimal effort. However, after achieving its initial objectives, the development of AniDB Monitor slowed down, and it remained inactive until 2008.',
    date: new Date(),
    tags: ['Shoko', 'Release', 'Web UI'],
    url: '#',
    image: '/images/blog/3.webp',
  },
];

function BlogPreview({ url, tags, date, description, title, image, className }: BlogPreviewProps) {
  const navigate = useNavigate();
  return <div className={cx('flex flex-col gap-y-6 pb-8', className)}>
    <img src={image} alt={title} className="w-[900px]" />
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between">
        <div className="">
          {date.toLocaleDateString()}
        </div>
        <div className="flex gap-x-2">
          <Icon icon={mdiTagMultiple} className="text-shoko-link" />
          {tags.map((tag, index, arr) => {
            if (index === arr.length - 1)
              return <span key={tag} className="text-shoko-link">{tag} </span>;
            return <span key={tag} className="text-shoko-link">{tag} |</span>;
          })}
        </div>
      </div>
      <div className="text-2xl font-semibold">
        {title}
      </div>
      <div>
        {description}
      </div>
      <Button buttonType="primary" className="flex w-[165px]" onClick={() => navigate(url)}>
        <span>Read More</span>
        <Icon icon={mdiArrowRight} />
      </Button>
    </div>
  </div>;
}

function BlogList() {
  return <div className="flex w-[900px] flex-col">
    {items.map((item, index, arr) => {
      const className = index !== arr.length - 1 ? 'border-b mb-8' : 'mb-0';
      return (
        <BlogPreview key={item.title} {...item} className={className} />
      );
    })}
  </div>;
}

export default BlogList;
