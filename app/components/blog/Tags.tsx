import { useEffect, useState } from 'react';
import cx from 'classnames';
import { markdownList } from '~/helpers/markdown-list';
import { BlogPostProps, TagItemProps } from '~/types/BlogTypes';
import HighLightHeader from '~/components/blog/HighLightHeader';

const Tags: React.FC = () => {
  const [tagList, setTagList] = useState<TagItemProps[]>([]);

  useEffect(() => {
    const fetchDataAndProcessTags = async () => {
      const dataList = markdownList('blog');
      const tagCountMap: TagItemProps[] = [];

      dataList.forEach((item: BlogPostProps) => {
        item.frontmatter.tags.forEach((tag: string) => {
          const existingTag = tagCountMap.find((t) => t.name === tag);
          if (existingTag) {
            existingTag.count += 1;
          } else {
            tagCountMap.push({ name: tag, count: 1 });
          }
        });
      });

      tagCountMap.sort((a, b) => a.name.localeCompare(b.name));
      setTagList(tagCountMap);
    };

    fetchDataAndProcessTags();
  }, []);

  return (
    <div className="mb-0 flex w-full flex-col justify-between gap-y-6 font-semibold">
      <HighLightHeader title="Tags" />
      <div className="flex flex-col gap-y-2">
        {tagList.map((tag, index) => (
          <div
            key={tag.name}
            className={cx(
              'flex justify-between pb-2',
              tagList.length !== index + 1 && 'border-b border-shoko-border',
            )}
          >
            <div>{tag.name}</div>
            <div>({tag.count})</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
