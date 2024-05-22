type UserCardProps = {
  name: string;
  image: string;
  link: string;
  role?: string;
  joinDate?: string;
};

const UserCard = ({ name, joinDate, role, image, link }: UserCardProps) => {
  return (
    <a
      className="bg-shoko-bg-alt flex w-[11.125rem] flex-col items-center gap-y-4 rounded-lg p-4 transition-transform duration-300 hover:-translate-y-4"
      href={link}
      rel="noopener noreferrer"
      target="_blank"
    >
      <img className="size-[4.6875rem] rounded-full" src={image} alt={name} loading="lazy" />
      <div className="flex flex-col items-center gap-y-1">
        <div className="text-shoko-text-header text-sm font-medium capitalize">{name}</div>
        {role && (
          <div className="text-shoko-text-header flex h-12 flex-col items-center justify-end gap-y-1 text-sm font-medium capitalize opacity-65">
            <div>{joinDate} - Present</div>
            <div>{role}</div>
          </div>
        )}
      </div>
    </a>
  );
};

export default UserCard;
