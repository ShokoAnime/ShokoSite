import React, { ReactNode } from 'react';
import { ThemeProvider } from '~/context/ThemeContext';

type ProvidersProps = {
  children: ReactNode;
};

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};
