import SectionHeader from '~/components/common/SectionHeader';
import { BlogFilterProps } from '~/types/blog';
import Button from '~/components/common/Button';
import cx from 'classnames';

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
    <div className="flex w-full max-w-[300px] flex-col gap-y-8">
      <div className="sticky top-36 flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-6">
          <SectionHeader title="Share Your Project" type="h4" />
          <div className="flex flex-col items-start gap-y-1">
            If you&apos;re working on a project that uses Shoko, feel free to create a blog post for it. Please reach
            out to us on Discord if you would like to do so.
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <SectionHeader title="Available Tags" type="h4" />
          <div className="flex flex-wrap items-start gap-1">
            {tagList.sort().map((tag) => (
              <div key={tag.name} className="flex justify-between">
                <Button
                  className={cx(
                    'hover:text-shoko-link-hover duration-0 py-2 px-2 text-sm',
                    selectedTags.includes(tag.name) && 'bg-shoko-link text-shoko-text-alt',
                  )}
                  buttonType="outline"
                  onClick={() => onTagChange(tag.name)}
                >
                  {tag.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListSidebar;
