import { useMemo } from 'react';
import { Link } from '@remix-run/react';

type NewsProps = {
  title: string;
  image: string;
  releaseDate: Date;
  content: string;
  link: string;
};

function News(props: NewsProps) {
  const { image, title, releaseDate, content, link } = props;
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
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][m];
    };

    return `${montStr(month)} ${day}${nth(day)}, ${year}`;
  }, [releaseDate]);
  return (
    <div className="flex flex-col gap-y-6">
      <img width={445} src={image} alt={title} />
      <div>
        <span>{timeStr}</span>
        <div>{title}</div>
      </div>
      <div>{content}</div>

      <Link className="text-[#3E64ED]" to={link}>
        Read more{' '}
      </Link>
    </div>
  );
}

export default News;
