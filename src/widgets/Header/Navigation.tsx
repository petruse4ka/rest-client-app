import { ThemeContext } from '@/context/theme-context';
import { navLinks } from '@/shared/config';
import { Flex, Grid } from 'antd';
import Link from 'next/link';
import { useContext } from 'react';
import { usePathname } from 'next/navigation';
const { useBreakpoint } = Grid;

export default function Navigation() {
  const { themeValue } = useContext(ThemeContext);
  const pathname = usePathname();
  const screens = useBreakpoint();

  return (
    <Flex gap="middle" vertical={!screens.md}>
      {navLinks.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            className={`link ${themeValue === 'dark' ? 'link--dark' : 'link--light'} ${isActive ? 'link--active' : ''}`}
            href={href}
          >
            {label}
          </Link>
        );
      })}
    </Flex>
  );
}
