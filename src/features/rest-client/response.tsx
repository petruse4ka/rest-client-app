import { ApiResponse } from '@/types/interfaces';
import { Card, Typography, Spin, Flex, Input } from 'antd';
import { useTranslations } from 'next-intl';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface ResponseProps {
  loading: boolean;
  error: string | null;
  response: ApiResponse | null;
}

export function Response({ loading, error, response }: ResponseProps) {
  const t = useTranslations('RestClient');

  if (loading) {
    return (
      <Card style={{ width: '100%', maxWidth: '90vw' }}>
        <Flex justify="center" align="center" style={{ padding: '50px' }}>
          <Spin size="large" tip={t('loading')} data-testid="loading-spinner">
            <div style={{ padding: '50px' }} />
          </Spin>
        </Flex>
      </Card>
    );
  }

  if (error) {
    return (
      <Card data-testid="error-card" style={{ width: '100%', maxWidth: '90vw' }}>
        <Title level={2} style={{ color: '#ff4d4f' }}>
          {t('error')}
        </Title>
        <Text>{error}</Text>
      </Card>
    );
  }

  if (response) {
    return (
      <Card data-testid="response-card" style={{ width: '100%', maxWidth: '90vw' }}>
        <Title level={2}>{t('response')}</Title>
        <Text strong>
          {t('status')}: {response.status} {response.statusText}
        </Text>
        <TextArea
          value={JSON.stringify(response.data, null, 2)}
          rows={8}
          disabled
          style={{
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        />
      </Card>
    );
  }

  return null;
}
