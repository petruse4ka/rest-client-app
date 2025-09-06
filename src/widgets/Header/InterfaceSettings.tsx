import { ThemeContext } from '@/context/theme-context';
import { languages } from '@/shared/config';
import { usePathname, useRouter } from '@/shared/i18n/navigation';
import { GlobalOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, MenuProps, Switch } from 'antd';
import { useContext } from 'react';

export default function InterfaceSettings() {
  const { themeValue, setThemeValue } = useContext(ThemeContext);
  const router = useRouter();
  const pathname = usePathname();

  const handleThemeChange = (checked: boolean) => {
    setThemeValue(checked ? 'dark' : 'light');
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e.key);
    router.push(pathname, { locale: e.key });
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
