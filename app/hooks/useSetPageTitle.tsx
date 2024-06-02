import { useEffect } from 'react';
import { convertToProperName } from '~/helpers/utils';

export const useSetPageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${convertToProperName(title)} | Shoko`;
  }, [title]);
};
