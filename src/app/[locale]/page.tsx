'use client';

import '@ant-design/v5-patch-for-react-19';
import { Flex, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/shared/config/firebase';

const { Title } = Typography;

export default function Home() {
  // For auth test
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Content style={{ padding: 24 }}>
      <Flex justify="center" align="center" vertical style={{ minHeight: '60vh' }}>
        {user ? (
          <Title level={3}>Welcome, {user.displayName || user.email || 'User'}!</Title>
        ) : (
          <Title level={3} type="secondary">
            Вы не авторизованы.
          </Title>
        )}
      </Flex>
    </Content>
  );
}
