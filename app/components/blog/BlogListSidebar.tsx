import SectionHeader from '~/components/common/SectionHeader';
import { BlogFilterProps } from '~/types/blog';
import Button from '~/components/common/Button';
import cx from 'classnames';
import Icon from '~/components/common/Icon';
import { mdiCheckCircle } from '@mdi/js';

const BlogListSidebar = (
  { availableTags, selectedTags, setSelectedTags, setTagClicked }: BlogFilterProps,
) => {
  const toggleTag = (tags: string[], tag: string) =>
    tags.includes(tag) ? tags.filter((tagCheck) => tagCheck !== tag) : [...tags, tag];

  const onTagChange = (tag: string) => {
    const newTags = toggleTag(selectedTags, tag);
    setSelectedTags(newTags);
    setTagClicked(true);
  };

  const tagList = availableTags.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="border-shoko-border flex w-full max-w-[250px] flex-col gap-y-8 border-r border-solid">
      <div className="flex flex-col gap-y-6">
        <SectionHeader title="Available Tags" type="h4" />
        <div className="flex flex-col items-start gap-y-1">
          {tagList.sort().map((tag) => (
            <div key={tag.name} className="flex w-full justify-between pr-6">
              <Button
                className={cx(
                  'hover:text-shoko-link-hover p-0 duration-0',
                  selectedTags.includes(tag.name) && '!text-shoko-link',
                )}
                buttonType="text"
                onClick={() => onTagChange(tag.name)}
              >
                {tag.name} ({tag.count})
              </Button>
              {selectedTags.includes(tag.name) && <Icon icon={mdiCheckCircle} className="text-shoko-link" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListSidebar;
