'use client';

import '@ant-design/v5-patch-for-react-19';
import { Button, Typography, Space, Layout, Flex } from 'antd';
import { HomeOutlined, ReloadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import getRandomMessage from '@/shared/utils/get-random-message';

const { Title, Text } = Typography;
const { Content } = Layout;

const logoStyles: CSSProperties = {
  animation: 'pulse 2s ease-in-out infinite',
  transition: 'transform 0.3s ease',
};

const textStyles: CSSProperties = {
  fontSize: '1.5rem',
  color: 'white',
  fontWeight: '500',
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  display: 'block',
  textAlign: 'center',
};

const contentStyles: CSSProperties = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 20px',
};

export default function NotFound() {
  const t = useTranslations('NotFound');
  const notFoundMessages: string[] = t.raw('messages');
  const [currentMessage, setCurrentMessage] = useState(notFoundMessages[0]);

  useEffect(() => {
    setCurrentMessage((prevMessage) => getRandomMessage(prevMessage, notFoundMessages));
  }, [notFoundMessages]);

  return (
    <Content style={contentStyles}>
      <Flex data-testid="not-found-content" vertical align="center" justify="center">
        <Space direction="vertical" size="large" align="center">
          <Title data-testid="not-found-title" style={{ textAlign: 'center' }}>
            {t('title')}
          </Title>
          <Space direction="vertical" size="large" align="center">
            <Image
              data-testid="not-found-logo"
              src="/logo.png"
              alt={t('logoAlt')}
              width={200}
              height={200}
              style={logoStyles}
            />
          </Space>

          <Space direction="vertical" size="middle" align="center">
            <Text data-testid="not-found-message" style={textStyles}>
              {currentMessage}
            </Text>
          </Space>

          <Space direction="vertical" size="large" align="center">
            <Button
              data-testid="random-message-button"
              type="default"
              size="small"
              icon={<ReloadOutlined />}
              onClick={() => setCurrentMessage(getRandomMessage(currentMessage, notFoundMessages))}
            >
              {t('tryAnotherMessage')}
            </Button>

            <Link href="/" data-testid="homepage-link">
              <Button
                data-testid="homepage-button"
                type="primary"
                icon={<HomeOutlined />}
                style={{ border: 'none' }}
              >
                {t('returnToHomepage')}
              </Button>
            </Link>
          </Space>
        </Space>
      </Flex>
    </Content>
  );
}
