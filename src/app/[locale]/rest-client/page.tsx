'use client';

import '@ant-design/v5-patch-for-react-19';
import { CSSProperties, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, Form, Typography, Flex, Divider } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { RequestBody, ApiResponse, Header } from '@/types/interfaces';
import { ContentType } from '@/types/types';
import { HttpMethod } from '@/types/types';
import { HeadersEditor, BodyEditor, HttpMethods, Response } from '@/features/rest-client';
import axios from 'axios';
import { getReadableErrorMessage, validateJson } from '@/shared/utils';
import { DEFAULT_HEADERS, ERROR_MESSAGES } from '@/shared/constants';

const { Title } = Typography;

export default function RestClientPage() {
  const t = useTranslations('RestClient');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: RequestBody) => {
    if (values.contentType === ContentType.JSON && values.data?.trim()) {
      const isJsonValid = validateJson(values.data, values.contentType);
      if (!isJsonValid) {
        setError(ERROR_MESSAGES.INVALID_JSON);
        return;
      }
    }

    const headersArray = Array.isArray(values.headers) ? values.headers : [];
    const invalidHeaders = headersArray.filter(
      (header: Header) =>
        (header.key.trim() && !header.value.trim()) || (!header.key.trim() && header.value.trim())
    );

    if (invalidHeaders.length > 0) {
      setError(ERROR_MESSAGES.KEY_AND_VALUE);
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const headersObject: Record<string, string> = {};
      headersArray.forEach((header: Header) => {
        if (header.key.trim() && header.value.trim()) {
          headersObject[header.key.trim()] = header.value.trim();
        }
      });

      const requestData: RequestBody = {
        method: values.method,
        url: values.url,
        headers: headersObject,
        data: values.data?.trim() || undefined,
        contentType: values.contentType,
      };

      const response = await axios.post('/api/rest-client', requestData);

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setResponse(response.data);
      }
    } catch (error) {
      setError(getReadableErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const contentStyles: CSSProperties = {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '0 16px',
  };

  return (
    <Content>
      <Flex vertical align="center" gap="large" style={contentStyles}>
        <Title data-testid="rest-client-title" style={{ textAlign: 'center' }}>
          {t('title')}
        </Title>
        <Card style={{ width: '100%' }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              method: HttpMethod.GET,
              url: '',
              headers: DEFAULT_HEADERS,
              data: '',
              contentType: ContentType.JSON,
            }}
          >
            <HttpMethods loading={loading} />
            <Divider />
            <Form.Item name="headers" style={{ marginBottom: 0 }}>
              <HeadersEditor />
            </Form.Item>
            <Divider />
            <Form.Item name="data" style={{ marginBottom: 0 }}>
              <BodyEditor />
            </Form.Item>
            <Form.Item name="contentType" hidden>
              <input type="hidden" />
            </Form.Item>
          </Form>
        </Card>
        <Response loading={loading} error={error} response={response} />
      </Flex>
    </Content>
  );
}
