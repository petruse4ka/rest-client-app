'use client';

import { ThemeContext } from '@/context/theme-context';
import { languages } from '@/shared/config';
import { GlobalOutlined, MenuOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Drawer, Dropdown, Flex, MenuProps, Switch, Grid } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import { useContext, useState } from 'react';

const { useBreakpoint } = Grid;

const testStyle = {
  display: 'none',
};

export function HeaderApp() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [drawer, setDrawer] = useState(false);
  const screens = useBreakpoint();

  const showDrawer = () => {
    setDrawer(true);
  };

  const hiddenDrawer = () => {
    setDrawer(false);
  };

  const { themeValue, setThemeValue } = useContext(ThemeContext);
  const handleThemeChange = (checked: boolean) => {
    setThemeValue(checked ? 'dark' : 'light');
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e.key);
  };

  return (
    <Header>
      <Flex justify="space-between" gap="middle" align="center" className="h-full">
        {/*  <Flex align="center" gap="middle">
          <Switch
            checked={themeValue === 'dark'}
            onChange={handleThemeChange}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
          <Dropdown menu={{ items: languages, onClick: handleMenuClick }} placement="bottom">
            <Button shape="circle" icon={<GlobalOutlined />}></Button>
          </Dropdown>
        </Flex>

        <Flex gap="middle" align="center">
          <Link href="/">
            <img src="./logo.png" alt="Logo company" className="w-10" />
          </Link>
          {isLogin && (
            <Navigation />
          )}
        </Flex>

        {isLogin ? (
            <Button type="primary" className='md:hidden'>Logout</Button>
        ) : (
          <Flex gap="middle">
            <Button type="primary">Sign In</Button>
            <Button type="primary">Sign Up</Button>
          </Flex>
        )} */}

        {screens.md ? (
          <>
            <InterfaceSettings />

            <Flex gap="middle" align="center">
              <Link href="/">
                <img src="./logo.png" alt="Logo company" className="w-10" />
              </Link>
              {isLogin && <Navigation />}
            </Flex>

            <AuthControls isLogin={isLogin} />
          </>
        ) : (
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
        )}
      </Flex>
    </Header>
  );
}

function Navigation() {
  return (
    <Flex gap="middle" className="md:hidden">
      <Link href="/">Home</Link>
      <Link href="/">REST Client</Link>
      <Link href="/">History</Link>
      <Link href="/">Variables</Link>
    </Flex>
  );
}

function AuthControls({ isLogin }: { isLogin: boolean }) {
  return (
    <>
      {isLogin ? (
        <Button type="primary" className="!md:bg-black">
          Logout
        </Button>
      ) : (
        <Flex gap="middle">
          <Button type="primary">Sign In</Button>
          <Button type="primary">Sign Up</Button>
        </Flex>
      )}
    </>
  );
}

function InterfaceSettings() {
  const { themeValue, setThemeValue } = useContext(ThemeContext);
  const handleThemeChange = (checked: boolean) => {
    setThemeValue(checked ? 'dark' : 'light');
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e.key);
  };

  return (
    <Flex align="center" gap="middle">
      <Switch
        checked={themeValue === 'dark'}
        onChange={handleThemeChange}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
      />
      <Dropdown menu={{ items: languages, onClick: handleMenuClick }} placement="bottom">
        <Button shape="circle" icon={<GlobalOutlined />}></Button>
      </Dropdown>
    </Flex>
  );
}

// делаем папку Header, доп компоненты внутри нее (InterfaceSettings, AuthControls) - основной файл Header -> index.tsx
