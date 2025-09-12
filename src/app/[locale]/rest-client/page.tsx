'use client';

import '@ant-design/v5-patch-for-react-19';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, Form, Typography, Flex, Divider } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { RequestBody, ApiResponse, Header } from '@/types/interfaces';
import { ContentType } from '@/types/types';
import { HttpMethod } from '@/types/types';
import { HeadersEditor, BodyEditor, HttpMethods, Response } from '@/features/rest-client';
import axios from 'axios';
import { getReadableErrorMessage } from '@/shared/utils';

const { Title } = Typography;

export default function RestClientPage() {
  const t = useTranslations('RestClient');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [headers, setHeaders] = useState<Header[]>([]);
  const [bodyContent, setBodyContent] = useState('');
  const [bodyContentType, setBodyContentType] = useState<ContentType>(ContentType.JSON);

  const handleSubmit = async (values: RequestBody) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await axios.post('/api/rest-client', values);

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

  return (
    <Content>
      <Flex vertical align="center" gap="large">
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
            <HttpMethods loading={loading} />
            <Divider />
            <HeadersEditor headers={headers} onChange={setHeaders} />
            <Divider />
            <BodyEditor
              value={bodyContent}
              contentType={bodyContentType}
              handleContentTypeChange={(value, contentType) => {
                setBodyContent(value);
                setBodyContentType(contentType);
              }}
            />
          </Form>
        </Card>
        <Response loading={loading} error={error} response={response} />
      </Flex>
    </Content>
  );
}
