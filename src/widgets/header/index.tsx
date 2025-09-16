'use client';

import { Grid, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { CSSProperties, useEffect, useState } from 'react';
import DesktopHeader from './desktop-header';
import MobileHeader from './mobile-header';

const { useBreakpoint } = Grid;

const HeaderStyle: CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  transition: '0.3s',
};

export function HeaderApp() {
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
      {screens.md ? <DesktopHeader /> : <MobileHeader />}
    </Header>
  );
}
