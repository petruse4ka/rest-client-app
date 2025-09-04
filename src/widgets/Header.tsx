import { ThemeContext } from '@/context/theme-context';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Flex, Switch } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useContext } from 'react';

export function HeaderApp() {
  const { themeValue, setThemeValue } = useContext(ThemeContext);

  const handleThemeChange = (checked: boolean) => {
    setThemeValue(checked ? 'dark' : 'light');
  };
  return (
    <Header>
      <Flex justify="space-between" align="center">
        <img src="./logo.png" alt="Logo company" className="w-10" />
        <div>
          <Switch
            checked={themeValue === 'dark'}
            onChange={handleThemeChange}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </div>
        <div>
          <Button type="primary">Sign In</Button>
          <Button type="primary">Sign Up</Button>
        </div>
      </Flex>
    </Header>
  );
}
