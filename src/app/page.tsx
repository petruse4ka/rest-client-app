'use client';

import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider, Switch, theme } from 'antd';
import { ThemeContext } from '@/context/theme-context';
import { useState, useEffect } from 'react';
import getDefaultTheme from '@/shared/utils/get-default-theme';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { ThemeValue } from '@/types/types';
import { HeaderApp } from '@/widgets';
import { darkTheme, lightTheme } from '@/shared/config/theme';
import { Content, Footer } from 'antd/es/layout/layout';

export default function Home() {
  const [themeValue, setThemeValue] = useState<ThemeValue>('light');
  const { token } = theme.useToken();

  useEffect(() => {
    setThemeValue(getDefaultTheme());
  }, []);

  const handleThemeChange = (checked: boolean) => {
    setThemeValue(checked ? 'dark' : 'light');
  };

  return (
    <ThemeContext value={{ themeValue, setThemeValue }}>
      <ConfigProvider theme={themeValue === 'dark' ? darkTheme : lightTheme}>
        <HeaderApp />
        <Content className="h-svh" style={{ background: token.colorPrimary }}>
          <Switch
            checked={themeValue === 'dark'}
            onChange={handleThemeChange}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
          Content
        </Content>
        <Footer>Footer</Footer>
      </ConfigProvider>
    </ThemeContext>
  );
}
