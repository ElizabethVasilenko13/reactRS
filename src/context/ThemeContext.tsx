import { useLocalStorage } from '@hooks/useLocalStorage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo } from 'react';

type Theme = 'light' | 'dark';

interface ContextTheme {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ContextTheme | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('UseTheme error');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme: string) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
