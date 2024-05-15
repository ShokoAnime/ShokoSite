import { useEffect, useState } from 'react';

export const useDownloadData = (selectedTab: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let url;

      if (selectedTab === undefined) {
        url = `/data/downloads-shoko-server.json`;
      } else {
        url = `/data/downloads-${selectedTab}.json`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedData = await response.json();
      setData(fetchedData);
    };

    fetchData();
  }, [selectedTab]);

  return data;
};
