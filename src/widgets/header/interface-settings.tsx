import { ThemeContext } from '@/context/theme-context';
import { languages } from '@/shared/config';
import { usePathname, useRouter } from '@/shared/i18n/navigation';
import { useLocale } from 'next-intl';
import { GlobalOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, MenuProps, Switch } from 'antd';
import { useContext } from 'react';

export default function InterfaceSettings() {
  const { themeValue, setThemeValue } = useContext(ThemeContext);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleThemeChange = (checked: boolean) => {
    setThemeValue(checked ? 'dark' : 'light');
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const newLocale = e.key;

    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  return (
    <Flex align="center" gap="middle" data-testid="interface-settings">
      <Switch
        checked={themeValue === 'dark'}
        onChange={handleThemeChange}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
      />
      <Dropdown menu={{ items: languages, onClick: handleMenuClick }} placement="bottom">
        <Button size="small" shape="circle" icon={<GlobalOutlined />}></Button>
      </Dropdown>
    </Flex>
  );
}
