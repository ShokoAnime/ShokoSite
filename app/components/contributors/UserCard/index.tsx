interface UserCardProps {
  name: string;
  image: string;
  link: string;
  role?: string;
  joinDate?: string;
}

export const UserCard = ({ name, joinDate, role, image, link }: UserCardProps) => {
  return (
    <a
      className="flex w-[11.125rem] flex-col items-center gap-y-4 rounded-lg bg-backgroundAlt-light p-4 transition-transform duration-300 hover:-translate-y-4 dark:bg-backgroundAlt-dark"
      href={link}
      rel="noopener noreferrer"
      target="_blank"
    >
      <img className="size-full max-h-[4.6875rem] max-w-[4.6875rem] rounded-full" src={image} alt={name} />
      <div className="flex flex-col items-center gap-y-1">
        <div className="text-sm font-medium capitalize text-textHeader-light dark:text-textHeader-dark">{name}</div>
        {role && (
          <div className="flex flex-col items-center gap-y-1 text-sm font-medium capitalize text-textHeader-light opacity-65 dark:text-textHeader-dark">
            <div>{joinDate} - Present</div>
            <div>{role}</div>
          </div>
        )}
      </div>
    </a>
  );
};
