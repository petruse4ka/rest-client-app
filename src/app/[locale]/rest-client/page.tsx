'use client';

import '@ant-design/v5-patch-for-react-19';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Card, Form, Input, Select, Space, Typography, Spin, Flex } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import { RequestBody, ApiResponse } from '@/types/interfaces';
import { HttpMethod } from '@/types/types';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function RestClientPage() {
  const t = useTranslations('RestClient');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: RequestBody) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await axios.post('/api/rest-client', values);

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setResponse(response);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('errorMessage');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content>
      <Flex vertical align="center">
        <Space direction="vertical" size="large" align="center">
          <Title data-testid="rest-client-title">{t('title')}</Title>

          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                method: HttpMethod.GET,
                url: '',
              }}
            >
              <Flex gap="large" align="end">
                <Form.Item
                  name="method"
                  label={t('method')}
                  rules={[{ required: true, message: t('methodRequired') }]}
                >
                  <Select data-testid="method-select">
                    <Select.Option value={HttpMethod.GET}>{HttpMethod.GET}</Select.Option>
                    <Select.Option value={HttpMethod.POST}>{HttpMethod.POST}</Select.Option>
                    <Select.Option value={HttpMethod.PUT}>{HttpMethod.PUT}</Select.Option>
                    <Select.Option value={HttpMethod.DELETE}>{HttpMethod.DELETE}</Select.Option>
                    <Select.Option value={HttpMethod.PATCH}>{HttpMethod.PATCH}</Select.Option>
                    <Select.Option value={HttpMethod.HEAD}>{HttpMethod.HEAD}</Select.Option>
                    <Select.Option value={HttpMethod.OPTIONS}>{HttpMethod.OPTIONS}</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="url"
                  label={t('url')}
                  rules={[{ required: true, message: t('urlRequired') }]}
                  style={{ flex: 1 }}
                >
                  <Input data-testid="url-input" placeholder={t('urlPlaceholder')} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    icon={<SendOutlined />}
                    style={{ border: 'none' }}
                    data-testid="send-button"
                  >
                    {t('sendRequest')}
                  </Button>
                </Form.Item>
              </Flex>
            </Form>
          </Card>

          {loading && (
            <Card>
              <Flex justify="center" align="center" style={{ padding: '50px' }}>
                <Spin size="large" tip={t('loading')} data-testid="loading-spinner">
                  <div style={{ padding: '50px' }} />
                </Spin>
              </Flex>
            </Card>
          )}

          {error && (
            <Card data-testid="error-card">
              <Title level={2} style={{ color: '#ff4d4f' }}>
                {t('error')}
              </Title>
              <TextArea value={error} readOnly rows={4} />
            </Card>
          )}

          {response && (
            <Card data-testid="response-card">
              <Title level={2}>{t('response')}</Title>
              <Text>
                {t('status')}: {(response.data as ApiResponse).status}{' '}
                {(response.data as ApiResponse).statusText}
              </Text>
              <TextArea
                value={JSON.stringify(response.data, null, 2)}
                readOnly
                rows={20}
                style={{ fontFamily: 'monospace' }}
              />
            </Card>
          )}
        </Space>
      </Flex>
    </Content>
  );
}
