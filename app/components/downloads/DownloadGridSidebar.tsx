import SectionHeader from '~/components/common/SectionHeader';
import { BlogFilterProps } from '~/types/blog';
import Button from '~/components/common/Button';
import cx from 'classnames';

const DownloadGridSidebar = (
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
  const types = tagList.filter(tag => tag.name === 'Dark Theme' || tag.name === 'Light Theme');
  const colors = tagList.filter(tag => tag.name !== 'Dark Theme' && tag.name !== 'Light Theme');

  return (
      <div className="lg:sticky lg:top-36 flex lg:flex-col flex-row flex-wrap gap-6 max-w-[72%] lg:w-full lg:max-w-[300px] px-4 lg:px-0">
        <div className="flex flex-col gap-y-6 grow w-full">
          <SectionHeader title="Share Your Themes" type="h4" />
          <div className="flex flex-col items-start gap-y-1">
            Have a theme you&apos;ve created or want to learn how?
            <a className="text-shoko-link" href="/">Click Here to Learn How</a>
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <SectionHeader title="Type" type="h4" />
          <div className="flex flex-wrap items-start gap-1">
            {types.sort().map((tag) => (
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
        <div className="flex flex-col gap-y-6">
          <SectionHeader title="Colors" type="h4" />
          <div className="flex flex-wrap items-start gap-1">
            {colors.sort().map((tag) => (
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
  );
};

export default DownloadGridSidebar;
