import { useEffect, useState } from 'react';
import cx from 'classnames';
import { markdownList } from '~/helpers/markdown-list';
import { BlogPostProps, TagItemProps } from '~/types/BlogTypes';
import HighLightHeader from '~/components/blog/HighLightHeader';
import { useBlogData } from '~/context/BlogContext';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import Button from '~/components/common/Button';

const Tags = () => {
  const [tagList, setTagList] = useState<TagItemProps[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { fetchBlogList } = useBlogData();

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

  const handleTagChange = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    fetchBlogList(updatedTags.length > 0 ? updatedTags : ['All']);
  };

  const resetTags = () => (
    <Button
      buttonType="text"
      className="!text-shoko-link hover:!text-shoko-link-hover"
      onClick={() => {
        setSelectedTags([]);
        fetchBlogList(['All']);
      }}
    >
      Reset Tags
    </Button>
  );

  return (
    <div className="mb-0 flex w-full flex-col justify-between gap-y-6 font-semibold">
      <HighLightHeader title="Avalable Tags" rightSide={selectedTags.length > 0 && resetTags()} />
      <OverlayScrollbarsComponent
        element="span"
        options={{ scrollbars: { autoHide: 'never' } }}
        events={{ scroll: () => {/* ... */} }}
        defer
      >
        <div className="flex h-[30rem] flex-col gap-y-2">
          {tagList.map((tag, index) => (
            <div
              key={tag.name}
              className={cx(
                'flex items-center justify-between pb-2  cursor-pointer',
                tagList.length !== index + 1 && 'border-b border-shoko-border',
              )}
            >
              <label htmlFor={tag.name} className="flex w-full cursor-pointer items-center justify-between">
                {tag.name}
                <div className="flex gap-x-2">
                  <div>({tag.count})</div>
                  <input
                    className="mr-6"
                    type="checkbox"
                    id={tag.name}
                    checked={selectedTags.includes(tag.name)}
                    onChange={() => handleTagChange(tag.name)}
                  />
                </div>
              </label>
            </div>
          ))}
        </div>
      </OverlayScrollbarsComponent>
    </div>
  );
};

export default Tags;
