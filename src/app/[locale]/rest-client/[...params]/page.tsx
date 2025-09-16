'use client';

import '@ant-design/v5-patch-for-react-19';
import { CSSProperties, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, Form, Typography, Flex, Divider, Button } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { RequestBody, ApiResponse, Header } from '@/types/interfaces';
import { ContentType } from '@/types/types';
import { HeadersEditor, BodyEditor, HttpMethods, Response } from '@/features/rest-client';
import axios from 'axios';
import {
  getReadableErrorMessage,
  validateJson,
  encodeRestClientUrl,
  getInitialFormValues,
} from '@/shared/utils';
import { ERROR_MESSAGES } from '@/shared/constants';
import { useSearchParams, useParams } from 'next/navigation';

const { Item } = Form;
const { Title } = Typography;

export default function RestClientPageDefault() {
  const t = useTranslations('RestClient');
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const urlParameters = useParams();
  const urlParts = Array.isArray(urlParameters.params) ? urlParameters.params : [];
  const initialFormValues = getInitialFormValues(urlParts, searchParams);

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

      (keyTrim && !valueTrim) || (!keyTrim && valueTrim);
    });

    if (invalidHeaders.length > 0) {
      setError(ERROR_MESSAGES.KEY_AND_VALUE);
      return;
    }

    const encodedUrl = encodeRestClientUrl(values);
    window.history.replaceState(null, '', encodedUrl);

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
            initialValues={initialFormValues}
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
