import { useEffect } from 'react';
import { convertToProperName } from '~/helpers/helpers';

export const useSetPageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${convertToProperName(title)} | Shoko`;
  }, [title]);
};
