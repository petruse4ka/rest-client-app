import { ThemeContext } from '@/context/theme-context';
import { languages } from '@/shared/config';
import { GlobalOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, MenuProps, Switch } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import { useContext, useState } from 'react';

export function HeaderApp() {
  const { themeValue, setThemeValue } = useContext(ThemeContext);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleThemeChange = (checked: boolean) => {
    setThemeValue(checked ? 'dark' : 'light');
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e.key);
  };

  return (
    <Header>
      <Flex justify="space-between" gap="middle" align="center" className="h-full">
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

        <Flex gap="middle" align="center">
          <Link href="/">
            <img src="./logo.png" alt="Logo company" className="w-10" />
          </Link>
          {isLogin && (
            <Flex gap="middle">
              <Link href="/">Home</Link>
              <Link href="/">REST Client</Link>
              <Link href="/">History</Link>
              <Link href="/">Variables</Link>
            </Flex>
          )}
        </Flex>

        {isLogin ? (
          <Button type="primary">Logout</Button>
        ) : (
          <Flex gap="middle">
            <Button type="primary">Sign In</Button>
            <Button type="primary">Sign Up</Button>
          </Flex>
        )}
      </Flex>
    </Header>
  );
}
