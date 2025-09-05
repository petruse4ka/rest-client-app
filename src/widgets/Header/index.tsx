'use client';

import { Grid, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { CSSProperties, useEffect, useState } from 'react';
import DesctopHeader from './DesctopHeader';
import MobileHeader from './MobileHeader';
const { useBreakpoint } = Grid;

const HeaderStyle: CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  transition: '0.3s',
};

export function HeaderApp() {
  const [isLogin] = useState<boolean>(true);

  const [scrolled, setScrolled] = useState(false);
  const { token } = theme.useToken();
  const screens = useBreakpoint();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Header
      style={{
        ...HeaderStyle,
        ...(scrolled && { borderBottom: `1px solid ${token.colorPrimary}` }),
      }}
    >
      {screens.md ? <DesctopHeader isLogin={isLogin} /> : <MobileHeader isLogin={isLogin} />}
    </Header>
  );
}
