import React, { ReactNode, createContext, useContext, useState } from 'react';

interface BannerContextType {
  bannerURL: string;
  setBannerURL: (url: string) => void;
}

const BannerContext = createContext<BannerContextType>({
  bannerURL: '',
  setBannerURL: () => {},
});

interface BannerProviderProps {
  children: ReactNode;
}

export const useBannerContext = () => useContext(BannerContext);

const BannerProvider: React.FC<BannerProviderProps> = ({ children }) => {
  const [bannerURL, setBannerURL] = useState<string>('');

  return (
    <BannerContext.Provider value={{ bannerURL, setBannerURL }}>
      {children}
    </BannerContext.Provider>
  );
};

export { BannerContext, BannerProvider };
