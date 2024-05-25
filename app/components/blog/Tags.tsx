import HighLightHeader from '~/components/blog/HighLightHeader';
import { useState } from 'react';

type TagItemProps = {
  name: string;
  total: number;
  isChosen: boolean;
}

const tags: TagItemProps[] = [
  { name: 'Shoko', total: 10, isChosen: true },
  { name: 'Anime', total: 5, isChosen: false },
  { name: 'Manga', total: 3, isChosen: false },
  { name: 'Light Novel', total: 2, isChosen: false },
  { name: 'Visual Novel', total: 1, isChosen: false },
];

function TagItem({ isChosen, total, name }: TagItemProps) {
  const [isChecked, setIsChecked] = useState(isChosen);
  return <div className="mb-0 flex w-full items-center justify-between border-b py-3 font-semibold">
    <span>{name}</span>
    <span className="flex gap-x-2">
      <span>({total})</span>
      <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
    </span>
  </div>;
}


function Tags() {
  return <div className="flex w-full flex-col">
    <HighLightHeader title="Tags" />
    <div>
      {tags.map((tag) => (
        <TagItem key={tag.name} {...tag} />
      ))}
    </div>
  </div>;
}

export default Tags;
