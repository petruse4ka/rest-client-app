'use client';

import '@ant-design/v5-patch-for-react-19';
import { CSSProperties, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, Form, Typography, Flex, Divider, Button } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { RequestBody, ApiResponse, Header } from '@/types/interfaces';
import { ContentType } from '@/types/types';
import { HttpMethod } from '@/types/types';
import { HeadersEditor, BodyEditor, HttpMethods, Response } from '@/features/rest-client';
import axios from 'axios';
import { getReadableErrorMessage, validateJson } from '@/shared/utils';
import { DEFAULT_HEADERS, ERROR_MESSAGES } from '@/shared/constants';
import { getSize, measureDuration } from '@/shared/lib/auth/request-log-metrics';

const { Item } = Form;
const { Title } = Typography;

export default function RestClientPage() {
  const t = useTranslations('RestClient');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: RequestBody) => {
    const { method, url, headers, contentType, data } = values;

    setLoading(true);
    setError(null);
    setResponse(null);

    if (contentType === ContentType.JSON && data?.trim()) {
      const isJsonValid = validateJson(data, contentType);

      if (!isJsonValid) {
        setError(ERROR_MESSAGES.INVALID_JSON);
        return;
      }
    }

    const headersArray = Array.isArray(headers) ? headers : [];

    const invalidHeaders = headersArray.filter(({ key, value }: Header) => {
      const keyTrim = key.trim();
      const valueTrim = value.trim();

      return (keyTrim && !valueTrim) || (!keyTrim && valueTrim);
    });

    if (invalidHeaders.length > 0) {
      setError(ERROR_MESSAGES.KEY_AND_VALUE);
      return;
    }

    try {
      const headersObject: Record<string, string> = {};

      headersArray.forEach(({ key, value }: Header) => {
        const keyTrim = key.trim();
        const valueTrim = value.trim();

        if (keyTrim && valueTrim) {
          headersObject[keyTrim] = valueTrim;
        }
      });

      const requestData: RequestBody = {
        method,
        url,
        headers: headersObject,
        data: data?.trim() || undefined,
        contentType,
      };

      const { response, durationMs } = await measureDuration(() =>
        axios.post('/api/rest-client', requestData)
      );
      const statusCode = response.data.status;
      const requestSize = getSize(requestData);
      const responseSize = getSize(response?.data);

      if (response.data.error) {
        setError(response.data.error);
        await axios.post('/api/request-logs', {
          url,
          method,
          requestSize,
          responseSize,
          durationMs,
          errorDetails: response.data.error,
        });
      } else {
        setResponse(response.data);
        await axios.post('/api/request-logs', {
          url,
          method,
          statusCode,
          requestSize,
          responseSize,
          durationMs,
          errorDetails: '',
        });
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
    padding: '20px 16px',
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
            <Item name="headers" style={{ marginBottom: 0 }}>
              <HeadersEditor />
            </Item>
            <Divider />
            <Item name="data" style={{ marginBottom: 0 }}>
              <BodyEditor />
            </Item>
            <Item name="contentType" hidden>
              <input type="hidden" />
            </Item>
          </Form>
        </Card>

        <Button type="primary" data-testid="generated-code-button" style={{ width: '100%' }}>
          {t('generatedCode')}
        </Button>

        <Response loading={loading} error={error} response={response} />
      </Flex>
    </Content>
  );
}
