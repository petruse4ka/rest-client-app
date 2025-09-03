'use client';

import '@ant-design/v5-patch-for-react-19';
import { RocketOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { ThemeContext } from '@/context/theme-context';
import { useState, useEffect } from 'react';
import getDefaultTheme from '@/shared/utils/get-default-theme';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Theme } from '@/types/types';

export default function Home() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(getDefaultTheme());
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <div className="font-inter relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 p-8 dark:from-zinc-900 dark:to-zinc-800">
        <main className="mx-auto max-w-2xl text-center">
          <div className="mb-8">
            <RocketOutlined style={{ fontSize: '4rem', color: '#d97706' }} className="mb-4" />
          </div>
          <h1 className="mb-6 text-4xl leading-relaxed font-bold text-zinc-800 md:text-6xl dark:text-zinc-100">
            Something Great is Coming
          </h1>
          <p className="mb-8 text-xl text-zinc-600 dark:text-zinc-300">
            We are building an amazing REST client application that will revolutionize how you test
            and interact with APIs.
          </p>
          <Switch
            checked={theme === 'dark'}
            onChange={handleThemeChange}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </main>
      </div>
    </ThemeContext>
  );
}
