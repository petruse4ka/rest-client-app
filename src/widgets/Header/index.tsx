'use client';

import { Flex, Grid } from 'antd';
import { Header } from 'antd/es/layout/layout';

import { useState } from 'react';
import DesctopHeader from './DesctopHeader';
import MobileHeader from './MobileHeader';
const { useBreakpoint } = Grid;

export function HeaderApp() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const screens = useBreakpoint();

  return (
    <Header>
      {screens.md ? <DesctopHeader isLogin={isLogin} /> : <MobileHeader isLogin={isLogin} />}
    </Header>
  );
}
