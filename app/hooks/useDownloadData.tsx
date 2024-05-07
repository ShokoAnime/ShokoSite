import { useEffect } from 'react';
import { useDownloadsContext } from '~/context/DownloadsContext';
import { urlFormatProper, urlFormatURL } from '~/helpers/urlFormat';

export const useDownloadData = (selectedTab: string) => {
  const { setTab, setData, setIsLoading } = useDownloadsContext();

  useEffect(() => {
    const fetchData = async () => {
      const url = `/data/${urlFormatURL(selectedTab)}.json`;

      setIsLoading(true);
      setTab(urlFormatProper(selectedTab));

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
