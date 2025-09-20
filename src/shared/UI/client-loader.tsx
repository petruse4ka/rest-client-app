'use client';

import '@ant-design/v5-patch-for-react-19';
import { Spin, Flex } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface ClientLoaderProps {
  children: ReactNode;
}

export function ClientLoader({ children }: ClientLoaderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Content
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Flex vertical align="center" justify="center">
          <Spin size="large" tip="Loading...">
            <div style={{ padding: '50px' }} />
          </Spin>
        </Flex>
      </Content>
    );
  }

  return <>{children}</>;
}
