import { createContext } from 'react';
import { ThemeContextType } from '@/types/types';

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});
