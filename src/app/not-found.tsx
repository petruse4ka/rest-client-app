'use client';

import '@ant-design/v5-patch-for-react-19';
import { Button, Typography, Space, Layout, Flex } from 'antd';
import { HomeOutlined, ReloadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const { Title, Text } = Typography;
const { Content } = Layout;

const notFoundMessages = [
  'Oops! This page went on vacation 🏖️',
  "404: The page you're looking for is in another castle 🏰",
  'This page is playing hide and seek... and winning! 🫥',
  'Error 404: Page not found (but we found this cool message instead!) 🎉',
  "Houston, we have a problem... this page doesn't exist! 🚀",
  "This page is so lost, even GPS can't find it! 🗺️",
  '404: The page you seek has been abducted by aliens 👽',
  'This page is currently attending a party in another dimension 🎭',
];

export default function NotFound() {
  const [currentMessage, setCurrentMessage] = useState(notFoundMessages[0]);

  const getRandomMessage = (messages: string[]) => {
    const message = currentMessage;
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];
    if (randomMessage === message) {
      return getRandomMessage(messages);
    }
    setCurrentMessage(messages[randomIndex]);
  };

  useEffect(() => {
    getRandomMessage(notFoundMessages);
  }, []);

  return (
    <Layout
      data-testid="not-found-layout"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Content>
        <Flex
          data-testid="not-found-content"
          vertical
          align="center"
          justify="center"
          style={{
            padding: '15px',
            minHeight: '100vh',
            position: 'relative',
          }}
        >
          <Space direction="vertical" size="large" align="center">
            <Title
              data-testid="not-found-title"
              level={1}
              style={{
                fontSize: '4rem',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg,rgb(255, 186, 107),rgb(228, 123, 37))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                paddingBottom: '10px',
              }}
            >
              Page Not Found
            </Title>
            <Space direction="vertical" size="large" align="center">
              <Image
                data-testid="not-found-logo"
                src="/logo.png"
                alt="REST Client App Logo"
                width={200}
                height={200}
                style={{
                  animation: 'pulse 2s ease-in-out infinite',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Space>

            <Space direction="vertical" size="middle" align="center">
              <Text
                data-testid="not-found-message"
                style={{
                  fontSize: '1.5rem',
                  color: 'white',
                  fontWeight: '500',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                {currentMessage}
              </Text>
            </Space>

            <Space direction="vertical" size="large" align="center">
              <Button
                data-testid="random-message-button"
                type="text"
                icon={<ReloadOutlined />}
                onClick={() => getRandomMessage(notFoundMessages)}
                style={{
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '500',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '20px',
                }}
              >
                Try Another Message
              </Button>

              <Link href="/" data-testid="homepage-link">
                <Button
                  data-testid="homepage-button"
                  type="primary"
                  size="large"
                  icon={<HomeOutlined />}
                  style={{
                    height: '50px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    borderRadius: '25px',
                    background: 'linear-gradient(45deg,rgb(255, 186, 107),rgb(228, 123, 37))',
                    border: 'none',
                  }}
                >
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
