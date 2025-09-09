'use client';

import { authLinks, navLinks } from '@/shared/config/navigation';
import { Button, Flex, Typography } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
const { Title, Text } = Typography;

export function HeroSection() {
  const [isLogin] = useState(true);
  const links = isLogin ? navLinks.slice(1) : authLinks;
  return (
    <Flex
      align="center"
      justify="center"
      vertical
      gap={40}
      style={{ height: 'calc(100svh - 63px)', textAlign: 'center' }}
    >
      <Flex align="center" justify="center" vertical>
        <Title>REST Client App</Title>
        <Text style={{ fontSize: '1.5rem' }}>A tool for testing and sending HTTP requests</Text>
      </Flex>
      <Flex gap={20} wrap justify="center">
        {links.map(({ href, label }) => (
          <Link key={href} href={href}>
            <Button type="primary" size="large">
              {label}
            </Button>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
