import SectionHeader from '~/components/common/SectionHeader';
import { BlogFilterProps } from '~/types/blog';
import Button from '~/components/common/Button';
import cx from 'classnames';
import { useMobile } from '~/hooks/useMobile';

const BlogListSidebar = (
  { availableTags, selectedTags, setSelectedTags, setTagClicked }: BlogFilterProps,
) => {
  const { isMobile } = useMobile();

  const toggleTag = (tags: string[], tag: string) =>
    tags.includes(tag) ? tags.filter((tagCheck) => tagCheck !== tag) : [...tags, tag];

  const onTagChange = (tag: string) => {
    const newTags = toggleTag(selectedTags, tag);
    setSelectedTags(newTags);
    setTagClicked(true);
  };

  const tagList = availableTags.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex w-full flex-col gap-8 pb-12 xl:max-w-[300px] xl:border-0">
      <div className="static top-36 flex flex-col gap-y-6 lg:sticky">
        <div className="flex flex-col gap-y-6">
          <SectionHeader title="Share Your Project" type="h4" center={isMobile} />
          <div className={cx('flex flex-col gap-y-1', isMobile ? 'mx-auto max-w-[850px] text-center' : 'items-start')}>
            If you&apos;re working on a project that uses Shoko, feel free to create a blog post for it. Please reach
            out to us on Discord if you would like to do so.
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <SectionHeader title="Available Tags" type="h4" center={isMobile} />
          <div className={cx('flex flex-wrap gap-1', isMobile ? 'mx-auto max-w-[850px] text-center' : 'items-start')}>
            {tagList.sort().map((tag) => (
              <div key={tag.name} className="flex justify-between">
                <Button
                  className={cx(
                    'px-2 py-2 text-sm duration-0 hover:text-shoko-link-hover',
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
