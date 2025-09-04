import { ThemeContext } from '@/context/theme-context';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Flex, Select, Switch } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { ReactNode, useContext } from 'react';

export function HeaderApp() {
  const { themeValue, setThemeValue } = useContext(ThemeContext);

  const handleThemeChange = (checked: boolean) => {
    setThemeValue(checked ? 'dark' : 'light');
  };

  const handleChangeLanguage = (value: { value: string; label: ReactNode }) => {
    console.log(value);
  };

  return (
    <Header>
      <Flex justify="space-between" align="center">
        <img src="./logo.png" alt="Logo company" className="w-10" />
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
        <div>
          <Button type="primary">Sign In</Button>
          <Button type="primary">Sign Up</Button>
        </div>
      </Flex>
    </Header>
  );
}
