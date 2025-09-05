'use client';

import { ThemeContext } from '@/context/theme-context';
import { languages } from '@/shared/config';
import { GlobalOutlined, MenuOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Drawer, Dropdown, Flex, MenuProps, Switch, Grid } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import { useContext, useState } from 'react';
import InterfaceSettings from './InterfaceSettings';
import AuthControls from './AuthControls';
import Navigation from './Navigation';
import DesctopHeader from './DesctopHeader';
import MobileHeader from './MobileHeader';
const { useBreakpoint } = Grid;

export function HeaderApp() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const screens = useBreakpoint();

  return (
    <Header>
      <Flex justify="space-between" gap="middle" align="center" className="h-full">
        {screens.md ? <DesctopHeader isLogin={isLogin} /> : <MobileHeader isLogin={isLogin} />}
      </Flex>
    </Header>
  );
}
