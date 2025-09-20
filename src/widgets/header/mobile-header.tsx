import { useEffect, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Flex, Space } from 'antd';
import InterfaceSettings from './interface-settings';
import Navigation from './navigation';
import AuthControls from './auth-controls';
import Logo from './logo';
import { usePathname } from '@/shared/i18n/navigation';
import { AppUser } from '@/types/types';

type MobileHeaderProps = {
  user: AppUser;
};

export default function MobileHeader({ user }: MobileHeaderProps) {
  const isLogin = !!user;
  const [drawer, setDrawer] = useState(false);

  const showDrawer = () => {
    setDrawer(true);
  };

  const hiddenDrawer = () => {
    setDrawer(false);
  };

  const pathname = usePathname();

  useEffect(() => {
    if (drawer) hiddenDrawer();
  }, [pathname]);

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ height: '100%' }}
        data-testid="mobile-header"
      >
        <Logo size={33} />
        <Button size="small" icon={<MenuOutlined />} onClick={showDrawer} aria-label="Open menu" />
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
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <AuthControls user={user} justify="center" />
          {isLogin && <Navigation />}
        </Space>
      </Drawer>
    </>
  );
}
