'use client';

import { Button, Typography, Space, Layout, Flex } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

const { Title, Text } = Typography;
const { Content } = Layout;

export default function NotFound() {
  return (
    <Layout>
      <Content>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{ padding: '15px', minHeight: '100vh' }}
        >
          <Space direction="vertical" size="large" align="center">
            <Title level={1}>Page Not Found</Title>

            <Space direction="vertical" size="large" align="center">
              <Image
                src="/logo.png"
                alt="REST Client App Logo"
                width={200}
                height={200}
                style={{
                  animation: 'spin 2s linear infinite',
                }}
              />
            </Space>

            <Space direction="vertical" size="middle" align="center">
              <Text style={{ fontSize: '1.25rem' }}>
                You can return to HomePage or keep on being hypnotized by our rotating logo
              </Text>
            </Space>

            <Space direction="vertical" size="large" align="center">
              <Link href="/">
                <Button type="primary" size="large" icon={<HomeOutlined />}>
                  Return to Homepage
                </Button>
              </Link>
            </Space>
          </Space>
        </Flex>
      </Content>
    </Layout>
  );
}
