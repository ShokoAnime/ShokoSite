import { useEffect } from 'react';
import { convertToProperName } from '~/helpers/helpers';

export const useSetPageTitle = (title: string): void => {
  useEffect(() => {
    document.title = title === ''
      ? 'Shoko | Anime Management System'
      : `${convertToProperName(title)} | Shoko`;
  }, [title]);
};
