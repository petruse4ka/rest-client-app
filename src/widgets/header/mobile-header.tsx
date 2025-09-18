import { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Flex, Space } from 'antd';
import InterfaceSettings from './interface-settings';
import Navigation from './navigation';
import AuthControls from './auth-controls';
import Logo from './logo';
import { useAuth } from '@/shared/provider/auth-provider';

export default function MobileHeader() {
  const { isLogin } = useAuth();
  const [drawer, setDrawer] = useState(false);

  const showDrawer = () => {
    setDrawer(true);
  };

  const hiddenDrawer = () => {
    setDrawer(false);
  };

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ height: '100%' }}
        data-testid="mobile-header"
      >
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
          <AuthControls />
        </Space>
      </Drawer>
    </>
  );
}
