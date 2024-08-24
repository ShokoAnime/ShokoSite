import cx from 'classnames';
import { HighLightHeaderProps } from '~/types/common';
import Text from './Text';

const SectionHeader = ({ title, type, subtitle, center, opacity, className }: HighLightHeaderProps) => {
  return (
    <div className={cx('flex flex-col gap-y-2', center && 'items-center text-center')}>
      <div className="flex items-baseline justify-between">
        {type === 'h2'
          ? <Text size="h2" className={className}>{title}</Text>
          : <Text size="h4" className={className}>{title}</Text>}
      </div>
      {subtitle && (
        <div
          className={cx(
            'font-header text-lg font-medium text-shoko-text-header',
            opacity ? `opacity-${opacity}` : 'opacity-75',
          )}
        >
          {subtitle}
        </div>
      )}
      <hr className="w-[120px] border border-shoko-highlight" />
    </div>
  );
};

export default SectionHeader;
