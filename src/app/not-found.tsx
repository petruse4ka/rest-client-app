'use client';

import '@ant-design/v5-patch-for-react-19';
import { Button, Typography, Space, Layout, Flex, theme } from 'antd';
import { HomeOutlined, ReloadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, CSSProperties, useContext } from 'react';
import { useTranslations } from 'next-intl';
import getRandomMessage from '@/shared/utils/get-random-message';
import { ThemeContext } from '@/context/theme-context';

const { Title, Text } = Typography;
const { Content } = Layout;

const contentStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
};

const titleStyles: CSSProperties = {
  fontSize: '4rem',
  fontWeight: 'bold',
  paddingBottom: '10px',
};

const logoStyles: CSSProperties = {
  animation: 'pulse 2s ease-in-out infinite',
  transition: 'transform 0.3s ease',
  marginBottom: '30px',
};

const messageStyles: CSSProperties = {
  fontSize: '1.5rem',
  color: 'white',
  fontWeight: '500',
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
};

const randomButtonStyles: CSSProperties = {
  fontSize: '1rem',
  borderRadius: '25px',
  marginTop: '20px',
};

const homeButtonStyles: CSSProperties = {
  fontSize: '1.1rem',
  fontWeight: '600',
  borderRadius: '25px',
};

export default function NotFound() {
  const t = useTranslations('NotFound');
  const notFoundMessages: string[] = t.raw('messages');
  const [currentMessage, setCurrentMessage] = useState(notFoundMessages[0]);
  const { token } = theme.useToken();
  const customToken = token as unknown as Record<string, string | number>;
  const { themeValue } = useContext(ThemeContext);

  useEffect(() => {
    setCurrentMessage((prevMessage) => getRandomMessage(prevMessage, notFoundMessages));
  }, [notFoundMessages]);

  return (
    <Layout
      data-testid="not-found-layout"
      style={{
        background: `linear-gradient(135deg, ${customToken.backgroundColorGradientStart} 0%, ${customToken.backgroundColorGradientEnd} 100%)`,
      }}
    >
      <Content style={contentStyles}>
        <Flex data-testid="not-found-content" vertical align="center" justify="center">
          <Space direction="vertical" size="large" align="center">
            <Title
              data-testid="not-found-title"
              level={1}
              style={{
                ...titleStyles,
                color: `${customToken.titleColor}`,
              }}
            >
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
              <Text data-testid="not-found-message" style={messageStyles}>
                {currentMessage}
              </Text>
            </Space>

            <Space direction="vertical" size="large" align="center">
              <Button
                data-testid="random-message-button"
                type="default"
                icon={<ReloadOutlined />}
                onClick={() =>
                  setCurrentMessage(getRandomMessage(currentMessage, notFoundMessages))
                }
                className={`btn-secondary ${themeValue === 'dark' ? 'btn-secondary--dark' : 'btn-secondary--light'}`}
                style={randomButtonStyles}
              >
                {t('tryAnotherMessage')}
              </Button>

              <Link href="/" data-testid="homepage-link">
                <Button
                  data-testid="homepage-button"
                  type="primary"
                  size="large"
                  icon={<HomeOutlined />}
                  className={`btn-gradient`}
                  style={homeButtonStyles}
                >
                  {t('returnToHomepage')}
                </Button>
              </Link>
            </Space>
          </Space>
        </Flex>
      </Content>
    </Layout>
  );
}
