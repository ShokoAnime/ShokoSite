import cx from 'classnames';
import { mdiAccount } from '@mdi/js';

import { UserCardProps } from '~/types/contributors';
import Icon from '~/components/common/Icon';

const UserCard = ({ type, className, name, joinDate, role, image, link }: UserCardProps) => {
  return (
    <a
      className={cx(
        'bg-shoko-bg-alt border-shoko-border flex w-[11.125rem] flex-col items-center gap-y-4 rounded-lg border border-solid p-4 transition-transform duration-300 hover:-translate-y-4',
        className,
      )}
      href={link}
      rel="noopener noreferrer"
      target="_blank"
      style={{ transformOrigin: 'center', willChange: 'transform', position: 'relative' }}
    >
      {image !== 'NA'
        ? <img className="size-[4.6875rem] rounded-full" src={image} alt={name} loading="lazy" />
        : (
          <div className="bg-shoko-bg border-shoko-border relative flex size-[4.6875rem] items-center justify-center rounded-full">
            <Icon className="text-shoko-text-header" icon={mdiAccount} size={52} />
          </div>
        )}
      <div className="flex flex-col items-center gap-y-1">
        <div className="text-shoko-text-header font-header text-sm font-medium capitalize">{name}</div>
        {type === 'contributors' && role && (
          <div className="text-shoko-text-header flex h-12 flex-col items-center justify-end text-sm font-medium capitalize opacity-75">
            <div>{joinDate} - Present</div>
            <div>{role}</div>
          </div>
        )}
      </div>
    </a>
  );
};

export default UserCard;
