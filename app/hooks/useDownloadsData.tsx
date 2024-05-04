// useDownloadsData.ts
import { useEffect } from 'react';
import { useDownloadsContext } from '~/context/DownloadsContext';

export const useDownloadsData = (tab: string) => {
  const { setData, setIsLoading } = useDownloadsContext();

  useEffect(() => {
    const fetchData = async () => {
      const tabFormatted = tab.replace(/ /g, '-').toLowerCase();
      const url = `/data/${tabFormatted}.json`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Failed to fetch tab data:', error);
        setData([]);
      }
    };

    fetchData();
  }, [tab, setData, setIsLoading]);
};
