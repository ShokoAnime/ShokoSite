import cx from 'classnames';
import { mdiAccount } from '@mdi/js';

import { UserCardProps } from '~/types/contributors';
import Icon from '~/components/common/Icon';

const UserCard = ({ position, className, name, joinDate, role, image, link }: UserCardProps) => {
  return (
    <a
      className={cx(
        'flex w-full flex-row items-center justify-between gap-y-4 rounded-lg border border-solid border-shoko-border bg-shoko-bg-alt p-4 transition-transform duration-300 hover:-translate-y-4 md:w-[11.125rem] md:flex-col',
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
          <div className="relative flex size-[4.6875rem] items-center justify-center rounded-full border-shoko-border bg-shoko-bg">
            <Icon className="text-shoko-text-header" icon={mdiAccount} size={52} />
          </div>
        )}
      <div className="flex flex-col items-center gap-y-1">
        <div className="font-header text-sm font-medium capitalize text-shoko-text-header">{name}</div>
        {position === 'contributors' && role && (
          <div className="flex h-12 flex-col items-center justify-end text-sm font-medium capitalize text-shoko-text-header opacity-75">
            <div>{joinDate} - Present</div>
            <div>{role}</div>
          </div>
        )}
      </div>
    </a>
  );
};

export default UserCard;
