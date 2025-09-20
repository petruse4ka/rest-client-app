'use client';

import { Button, Card, Flex, Typography, Space, Result } from 'antd';
import { useTranslations } from 'next-intl';
import { orangeColors } from '@/shared/style/colors';

const { Title, Text } = Typography;

export default function LocaleError() {
  const t = useTranslations('ErrorBoundary');

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
      <Card data-testid="error-container" style={{ maxWidth: '600px', width: '100%' }}>
        <Result
          status="error"
          title={
            <Title level={2} data-testid="error-title" style={{ color: orangeColors[500] }}>
              {t('title')}
            </Title>
          }
          subTitle={
            <Text data-testid="error-message" style={{ fontSize: '20px' }}>
              {t('message')}
            </Text>
          }
          extra={
            <Space>
              <Button type="primary" onClick={handleRefresh} data-testid="error-refresh-button">
                {t('buttonText')}
              </Button>
            </Space>
          }
        />
      </Card>
    </Flex>
  );
}
