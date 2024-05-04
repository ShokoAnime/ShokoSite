import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { DownloadsProvider } from './DownloadsContext';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <DownloadsProvider>
        {children}
      </DownloadsProvider>
    </ThemeProvider>
  );
};
