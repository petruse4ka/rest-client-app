import { ThemeContext } from '@/context/theme-context';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Flex, Row, Select, Switch } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import { ReactNode, useContext, useState } from 'react';

export function HeaderApp() {
  const { themeValue, setThemeValue } = useContext(ThemeContext);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleThemeChange = (checked: boolean) => {
    setThemeValue(checked ? 'dark' : 'light');
  };

  const handleChangeLanguage = (value: { value: string; label: ReactNode }) => {
    console.log(value);
  };

  return (
    <>
      <Header>
        <Flex justify="space-between" gap="middle" align="center" className="h-full">
          <Flex align="center" gap="middle">
            <Switch
              checked={themeValue === 'dark'}
              onChange={handleThemeChange}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
            <Select
              defaultValue={{ value: 'ru', label: 'Russian' }}
              style={{ width: 120 }}
              onChange={handleChangeLanguage}
              options={[
                { value: 'ru', label: 'Russian' },
                { value: 'en', label: 'English' },
                { value: 'be', label: 'Belarusian' },
              ]}
            />
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
    </>
  );
}
