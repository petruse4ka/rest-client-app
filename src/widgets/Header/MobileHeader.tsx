import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import InterfaceSettings from './InterfaceSettings';
import Navigation from './Navigation';
import AuthControls from './AuthControls';
import { useState } from 'react';

export default function MobileHeader({ isLogin }: { isLogin: boolean }) {
  const [drawer, setDrawer] = useState(false);

  const showDrawer = () => {
    setDrawer(true);
  };

  const hiddenDrawer = () => {
    setDrawer(false);
  };

  return (
    <>
      <Button icon={<MenuOutlined />} onClick={showDrawer} aria-label="Open menu" />
      <Drawer
        title="Basic Drawer"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={hiddenDrawer}
        open={drawer}
      >
        <InterfaceSettings />
        {isLogin && <Navigation />}
        <AuthControls isLogin={isLogin} />
      </Drawer>
    </>
  );
}
