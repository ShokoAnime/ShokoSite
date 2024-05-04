import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlug } from '@fortawesome/free-solid-svg-icons';
import { Button } from '~/components';
import { useNavigate } from '@remix-run/react';
import React from 'react';

export interface UserProps {
  name: string;
  image: string;
  url: string;
}

export interface DownloadCardProps {
  name: string;
  description: string;
  image: string;
  version?: string;
  date?: string;
  mediaPlayer?: string;
  user?: UserProps;
  tags?: string[];
}

export const DownloadCard = (
  { name, description, image, version, date, mediaPlayer, user, tags }: DownloadCardProps,
) => {
  const navigate = useNavigate();

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    navigate(
      target.innerText
        .replace('Download ', '')
        .replace(/ /g, '-')
        .toLowerCase(),
    );
  };

  return (
    <div className="flex max-w-[28.5rem] flex-col gap-y-6">
      <img className="rounded-lg" src={image} alt={name} />
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-3">
          <div className="text-xl font-medium text-textHeader-light dark:text-textHeader-dark">{name}</div>
          <hr className="w-[6.25rem] border border-highlight-light dark:border-highlight-dark" />
        </div>
        <div className="flex items-center gap-x-2 rounded-lg bg-backgroundAlt-light px-6 py-2 text-textHeader-light dark:bg-backgroundAlt-dark dark:text-textHeader-dark">
          <FontAwesomeIcon icon={faPlug} size="lg" />
          <div>{mediaPlayer}</div>
        </div>
      </div>
      <div className="line-clamp-3">
        {description}
      </div>
      <div className="flex justify-between font-medium text-textHeader-light opacity-65 dark:text-textHeader-dark">
        <div>Version: {version}</div>
        <div>Release Date: {date}</div>
      </div>
      <Button
        buttonType="resource"
        className="flex w-full items-center justify-center"
        onClick={(e) => onClickHandler(e)}
      >
        <FontAwesomeIcon icon={faDownload} size="lg" />
        <div>Download {name}</div>
      </Button>
    </div>
  );
};
