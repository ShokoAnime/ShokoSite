import HighLightHeader from '~/components/blog/HighLightHeader';
import { Link } from '@remix-run/react';
import { mdiOpenInNew } from '@mdi/js';
import Icon from '~/components/common/Icon';

type ItemProps = {
  title: string;
  image: string;
  url: string;
}

const items: ItemProps[] = [
  { title: ' Handyman Saitou in Another World', url: '#', image: '/images/blog/2.webp' },
];

function Items({ title, image, url }: ItemProps) {
  return <div className="flex flex-col items-center">
    <img src={image} alt={title} className="w-[352px]" />
    <Link className="text-shoko-link my-6 flex gap-x-2 font-semibold" to={url}>
      <span>{title}</span>
      <Icon icon={mdiOpenInNew} />
    </Link>
  </div>;
}

function SpotLight() {
  return <div className="flex flex-col items-start gap-y-6">
    <HighLightHeader title="Anime Spotlight" />
    <div>
      {items.map((item) => (
        <Items key={item.title} {...item} />
      ))}
    </div>
  </div>;
}

export default SpotLight;
