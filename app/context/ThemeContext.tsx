import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
};

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const savedTheme = Cookies.get('theme') as Theme | undefined;
    return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
  }
  return 'light';
};

const setThemeClass = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.classList.toggle('light', theme === 'light');
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    setThemeClass(theme);
    Cookies.set('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
