'use client';

import { authLinks, navLinks } from '@/shared/config/navigation';
import { Button, Flex, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/shared/config/firebase';

const { Title, Text } = Typography;

export function HeroSection() {
  const [isLogin, setIsLogin] = useState(false);
  const links = isLogin ? navLinks.slice(1) : authLinks;
  const t = useTranslations('Hero');
  const navt = useTranslations('NavInfo');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setIsLogin(!!firebaseUser);
    });

    return () => unsubscribe();
  }, []);

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
        <Text style={{ fontSize: '1.5rem' }}>{t('subtitle')}</Text>
      </Flex>
      <Flex gap={20} wrap justify="center">
        {links.map(({ href, label }) => (
          <Link key={href} href={href}>
            <Button type="primary" size="large">
              {navt(label)}
            </Button>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
