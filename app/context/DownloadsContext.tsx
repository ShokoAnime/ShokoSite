import React, { ReactNode, createContext, useContext, useState } from 'react';

interface DownloadsContextProps {
  tab: string;
  setTab: (tab: string) => void;
  data: string[] | [];
  setData: (data: string[] | []) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

interface DownloadsProviderProps {
  children: ReactNode;
}

export const DownloadsContext = createContext<DownloadsContextProps>({
  tab: '',
  setTab: () => {},
  data: [],
  setData: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const useDownloadsContext = () => useContext(DownloadsContext);

export const DownloadsProvider: React.FC<DownloadsProviderProps> = ({ children }) => {
  const [tab, setTab] = useState<string>('Shoko Server');
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <DownloadsContext.Provider value={{ tab, setTab, data, setData, isLoading, setIsLoading }}>
      {children}
    </DownloadsContext.Provider>
  );
};
