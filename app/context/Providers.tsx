import React, { ReactNode } from 'react';
import { ThemeProvider } from '~/context/ThemeContext';
import { BannerProvider } from '~/context/BannerContext';
import { DownloadsProvider } from '~/context/DownloadsContext';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <DownloadsProvider>
        <BannerProvider>
          {children}
        </BannerProvider>
      </DownloadsProvider>
    </ThemeProvider>
  );
};
