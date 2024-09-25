import { useEffect } from 'react';
import { convertToProperName } from '~/lib/convertToProperName';

export const useSetPageTitle = (title: string): void => {
  useEffect(() => {
    document.title = title === ''
      ? 'Shoko | Anime Management System'
      : `${convertToProperName(title)} | Shoko`;
  }, [title]);
};
