import cx from 'classnames';
import { HighLightHeaderProps } from '~/types/common';

export const SectionHeader = ({ title, type, subtitle, center, opacity }: HighLightHeaderProps) => {
  return (
    <div className={cx('flex flex-col gap-y-2', center && 'items-center')}>
      <div className="flex items-baseline justify-between">
        {type === 'h2' ? <h2>{title}</h2> : <h4>{title}</h4>}
      </div>
      {subtitle && (
        <div
          className={cx(
            'text-shoko-text-header font-header text-lg font-medium',
            opacity ? `opacity-${opacity}` : 'opacity-75',
          )}
        >
          {subtitle}
        </div>
      )}
      <hr className="border-shoko-highlight w-[120px] border" />
    </div>
  );
};
