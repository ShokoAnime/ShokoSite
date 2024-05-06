import { useEffect } from 'react';
import { useDownloadsContext } from '~/context/DownloadsContext';

export const useDownloadData = (selectedTab: string) => {
  const { setData, setIsLoading } = useDownloadsContext();

  useEffect(() => {
    const fetchData = async () => {
      const tabFormatted = selectedTab.replace(/ /g, '-').toLowerCase();
      const url = `/data/${tabFormatted}.json`;

      setIsLoading(true);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Failed to fetch selectedTab data:', error);
        setData([]);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [setData, setIsLoading, selectedTab]);
};
