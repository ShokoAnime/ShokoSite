import { useMemo } from 'react';
import { Link } from '@remix-run/react';

type NewsProps = {
  title: string;
  image: string;
  releaseDate: Date;
  content: string;
  link: string;
};

export const NewsPost = ({ image, title, releaseDate, content, link }: NewsProps) => {
  const timeStr = useMemo(() => {
    const year = releaseDate.getFullYear();
    const month = releaseDate.getMonth();
    const day = releaseDate.getDate();

    const nth = (d: number) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    const montStr = (m: number) => {
      return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ][m];
    };

    return `${montStr(month)} ${day}${nth(day)}, ${year}`;
  }, [releaseDate]);
  return (
    <div className="flex flex-col gap-y-6">
      <img className="w-[28.125rem] rounded-lg shadow-custom" src={image} alt={title} />
      <div className="text-textHeader-light dark:text-textHeader-dark">
        <div className="opacity-65">{timeStr}</div>
        <div className="text-xl">{title}</div>
      </div>
      <div>{content}</div>

      <Link className="font-medium text-link-light dark:text-link-dark" to={link}>
        Read More →
      </Link>
    </div>
  );
};
