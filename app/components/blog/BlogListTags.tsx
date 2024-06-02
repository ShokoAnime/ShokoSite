import { useState } from 'react';
import cx from 'classnames';
import { useBlogData } from '~/context/BlogContext';
import HighLightHeader from '~/components/common/HighLightHeader';
import Button from '~/components/common/Button';

const BlogListTags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { fetchBlogList, tagList } = useBlogData();

  const handleTagChange = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    fetchBlogList(updatedTags.length > 0 ? updatedTags : ['All']);

    document?.querySelector('#blog-list')?.scrollIntoView({ block: 'start' });
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
      <div className="flex flex-col gap-y-2">
        {tagList
          .sort((a, b) => b.count - a.count)
          .map((tag, index) => (
            <div
              key={tag.name}
              className={cx(
                'flex items-center justify-between pb-2 cursor-pointer',
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
    </div>
  );
};

export default BlogListTags;
