'use client';

import { authorLinks } from '@/shared/config';
import { GithubOutlined } from '@ant-design/icons';
import { Divider, Flex, Grid, Space, Typography } from 'antd';
import Image from 'next/image';
import { Footer } from 'antd/es/layout/layout';
const { useBreakpoint } = Grid;
const { Text, Link } = Typography;

export function FooterApp() {
  const screens = useBreakpoint();

  return (
    <Footer>
      <Flex justify="space-between" align="center" vertical={!screens.md} gap={10}>
        <Space size="middle">
          <Link href="https://rs.school/courses/reactjs" target="_blank">
            <Image src="/rss-logo.svg" alt="RSS Logo" width={40} height={40} />
          </Link>
          <Text>© 2025</Text>
        </Space>
        <Space split={screens.md ? <Divider type="vertical" /> : null}>
          {authorLinks.map(({ href, label }) => (
            <Link key={label} href={href} target="_blank">
              <Space size="small">
                <GithubOutlined />
                {screens.md ? label : label.split(' ')[0]}
              </Space>
            </Link>
          ))}
        </Space>
      </Flex>
    </Footer>
  );
}
