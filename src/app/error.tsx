'use client';

import { Button, Card, Flex, Typography, Space, Result } from 'antd';
import { ErrorTexts } from '@/types/interfaces';
import { orangeColors } from '@/shared/style/colors';

const { Title, Text } = Typography;

export default function GlobalError() {
  const texts: ErrorTexts = {
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please try refreshing the page.',
    buttonText: 'Refresh page',
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Flex
      data-testid="error-boundary"
      justify="center"
      align="center"
      style={{ minHeight: '100vh', padding: '20px' }}
    >
      <Card
        data-testid="error-container"
        style={{ maxWidth: '600px', width: '100%', backgroundColor: orangeColors[50] }}
      >
        <Result
          status="error"
          title={
            <Title level={2} data-testid="error-title" style={{ color: orangeColors[500] }}>
              {texts.title}
            </Title>
          }
          subTitle={
            <Text data-testid="error-message" style={{ fontSize: '20px' }}>
              {texts.message}
            </Text>
          }
          extra={
            <Space>
              <Button type="primary" onClick={handleRefresh} data-testid="error-refresh-button">
                {texts.buttonText}
              </Button>
            </Space>
          }
        />
      </Card>
    </Flex>
  );
}
