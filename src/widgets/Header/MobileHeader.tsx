import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Flex, Space } from 'antd';
import InterfaceSettings from './InterfaceSettings';
import Navigation from './Navigation';
import AuthControls from './auth-controls';
import { useState } from 'react';
import Logo from './Logo';

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
      <Flex justify="space-between" align="center" style={{ height: '100%' }}>
        <Logo />
        <Button size="large" icon={<MenuOutlined />} onClick={showDrawer} aria-label="Open menu" />
      </Flex>
      <Drawer
        closable={{ 'aria-label': 'Close Button' }}
        onClose={hiddenDrawer}
        open={drawer}
        extra={
          <Space>
            <InterfaceSettings />
          </Space>
        }
      >
        <Space direction="vertical" size="large">
          {isLogin && <Navigation />}
          <AuthControls isLogin={isLogin} />
        </Space>
      </Drawer>
    </>
  );
}
