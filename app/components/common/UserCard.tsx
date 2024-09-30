import cx from 'classnames';
import { UserCardProps } from '~/types/contributors';
import { CircleUser } from 'lucide-react';

const UserCard = ({ position, className, name, joinDate, role, image, link }: UserCardProps) => {
  return (
    <a
      className={cx(
        'flex w-full flex-col items-center justify-between gap-y-4 rounded-lg border border-solid border-shoko-border bg-shoko-bg-alt p-4 transition-transform duration-300 hover:-translate-y-4 hover:border-shoko-link',
        className,
      )}
      href={link}
      rel="noopener noreferrer"
      target="_blank"
      style={{ transformOrigin: 'center', willChange: 'transform', position: 'relative' }}
    >
      {image !== 'NA'
        ? (
          <img
            className="!mb-0 size-[4.6875rem] !rounded-full"
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
          />
        )
        : (
          <div className="relative flex size-[4.6875rem] items-center justify-center rounded-full border-shoko-border bg-shoko-bg">
            <CircleUser size={32} />
          </div>
        )}
      <div className="flex flex-col items-center gap-4 text-center md:gap-1 md:text-start">
        <div className="font-header font-bold capitalize text-shoko-text">{name}</div>
        {position === 'contributors' && role && (
          <div className="flex h-12 flex-col items-center justify-end gap-1 text-sm font-bold capitalize text-shoko-text-75">
            <div>{joinDate} - Present</div>
            <div>{role}</div>
          </div>
        )}
      </div>
    </a>
  );
};

export default UserCard;
