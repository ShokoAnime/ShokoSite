import cx from 'classnames';
import { HighLightHeaderProps } from '~/types/common';

const SectionHeader = ({ title, type, subtitle, center, opacity, className }: HighLightHeaderProps) => {
  return (
    <div className={cx('flex flex-col gap-y-2', className, center && 'items-center')}>
      <div className="flex items-baseline justify-between">
        {type === 'h2' ? <h2 className='text-2xl xl:text-3xl'>{title}</h2> : <h4>{title}</h4>}
      </div>
      {subtitle && (
        <div
          className={cx(
            'text-shoko-text-header font-header text-md xl:text-lg font-medium',
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

export default SectionHeader;
