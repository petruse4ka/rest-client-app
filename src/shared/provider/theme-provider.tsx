'use client';

import { ThemeContext } from '@/context/theme-context';
import { ReactNode, useEffect, useState } from 'react';
import { getDefaultTheme } from '../utils';
import { ThemeValue } from '@/types/types';
import { ConfigProvider } from 'antd';
import { darkTheme, lightTheme } from '../config';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeValue, setThemeValue] = useState<ThemeValue>('light');

  useEffect(() => {
    setThemeValue(getDefaultTheme());
  }, []);

  return (
    <ThemeContext value={{ themeValue, setThemeValue }}>
      <ConfigProvider theme={themeValue === 'dark' ? darkTheme : lightTheme}>
        {children}
      </ConfigProvider>
    </ThemeContext>
  );
}
