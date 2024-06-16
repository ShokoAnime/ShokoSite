import { useState } from 'react';
import cx from 'classnames';
import { BlogFilterProps } from '~/types/blog';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';
import { mdiFilterRemove, mdiFilterVariant } from '@mdi/js';

const BlogFilter = ({ availableTags, tagCount, selectedTags, setSelectedTags, setTagClicked }: BlogFilterProps) => {
  const [filter, showFilter] = useState(false);

  const toggleTag = (tags: string[], tag: string) =>
    tags.includes(tag) ? tags.filter((tagCheck) => tagCheck !== tag) : [...tags, tag];

  const onTagChange = (tag: string) => {
    const newTags = toggleTag(selectedTags, tag);
    setSelectedTags(newTags);
    setTagClicked(true);
  };

  return (
    <>
      <div className="border-shoko-border flex w-full max-w-[1074px] items-center justify-between border-b border-solid pb-6 text-xl">
        <div className="flex gap-x-2">
          <div>Filter</div>
          <div>{'>'}</div>
          <div className="text-shoko-highlight">{tagCount} {tagCount === 1 ? 'Post' : 'Posts'}</div>
        </div>
        <div className="flex gap-x-2">
          {selectedTags.length > 0 && (
            <Button
              className="px-3 py-2"
              buttonType="secondary"
              onClick={() => {
                showFilter(false);
                setTagClicked(true);
                setSelectedTags([]);
              }}
            >
              <Icon icon={mdiFilterRemove} />
              Clear All
            </Button>
          )}
          <Button
            className={cx('px-3 py-2', filter ? 'bg-shoko-link text-shoko-text-alt' : 'bg-none')}
            buttonType="outline"
            onClick={() => showFilter(!filter)}
          >
            <Icon icon={mdiFilterVariant} />
            Filter
          </Button>
        </div>
      </div>
      {filter && (
        <div className="border-shoko-border mx-auto flex h-[11.6rem] w-full max-w-[1074px] flex-col flex-wrap gap-x-4 gap-y-1 border-b border-solid pb-6">
          {availableTags.sort().map((tag) => (
            <label
              key={tag}
              htmlFor={tag}
              className="hover:text-shoko-link-hover flex w-[15.625rem] cursor-pointer items-center justify-between text-lg"
            >
              {tag}
              <div className="flex gap-x-2">
                <input
                  className="mr-6"
                  type="checkbox"
                  id={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={() => onTagChange(tag)}
                />
              </div>
            </label>
          ))}
        </div>
      )}
    </>
  );
};

export default BlogFilter;
