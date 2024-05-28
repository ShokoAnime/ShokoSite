import React, { ReactNode } from 'react';
import { ThemeProvider } from '~/context/ThemeContext';
import { BlogProvider } from '~/context/BlogContext';

type ProvidersProps = {
  children: ReactNode;
};

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <BlogProvider>
        {children}
      </BlogProvider>
    </ThemeProvider>
  );
};
