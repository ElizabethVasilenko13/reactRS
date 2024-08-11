import { useLocalStorage } from '@hooks/useLocalStorage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Theme = 'light' | 'dark';

export interface ContextTheme {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextTheme | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('UseTheme error');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');
  const [isMounted, setIsMounted] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme: string) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  useEffect(() => {
    setIsMounted(true);

    document.body.className = String(theme);
  }, [theme, setTheme]);

  if (!isMounted) {
    return null;
  }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
