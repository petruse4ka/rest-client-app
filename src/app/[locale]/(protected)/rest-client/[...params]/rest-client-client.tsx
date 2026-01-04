'use client';

import '@ant-design/v5-patch-for-react-19';
import { CSSProperties, useState } from 'react';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { HeadersEditor, BodyEditor, HttpMethods, Response } from '@/features/rest-client';
import {
  getReadableErrorMessage,
  validateJson,
  encodeRestClientUrl,
  getFormValuesFromUrl,
  substituteVariables,
  getSize,
  getInvalidHeaders,
  headersArrayToObject,
} from '@/shared/utils';
import { executeRestClientRequest, saveRequestLog } from '@/shared/api';
import { appRoutes } from '@/shared/config/navigation';

import { Card, Form, Typography, Flex, Divider, Button, Modal } from 'antd';
import { CodeGeneration } from '@/widgets';
import { Content } from 'antd/es/layout/layout';

import type { RequestBody, ApiResponse, Header } from '@/types/interfaces';
import { ContentType } from '@/types/types';
import { ERROR_MESSAGES } from '@/shared/constants';

const { Item } = Form;
const { Title } = Typography;

export default function RestClientClient() {
  const t = useTranslations('RestClient');
  const searchParams = useSearchParams();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const formValues = Form.useWatch([], form);

  const urlParameters = useParams();
  const initialFormValues = getFormValuesFromUrl(urlParameters, searchParams);

  const handleSubmit = async (values: RequestBody) => {
    try {
      const authResponse = await axios.post('/api/auth/verify');
      if (authResponse.status !== 204) {
        router.push(appRoutes.home, { scroll: false });
        return;
      }
    } catch {
      router.push(appRoutes.home, { scroll: false });
      return;
    }

    const { method, url, headers, contentType, data } = values;

    const substitutedUrl = substituteVariables(url);

    const headersArray = Array.isArray(headers) ? headers : [];
    const substitutedHeaders = headersArray.map(({ key, value }: Header) => ({
      key: substituteVariables(key),
      value: substituteVariables(value),
    }));

    const substitutedData = data ? substituteVariables(data.trim()) : undefined;

    if (contentType === ContentType.JSON && substitutedData?.trim()) {
      const isJsonValid = validateJson(substitutedData, contentType);

      if (!isJsonValid) {
        return;
      }
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    const invalidHeaders = getInvalidHeaders(substitutedHeaders);

    if (invalidHeaders.length > 0) {
      setError(ERROR_MESSAGES.KEY_AND_VALUE);
      return;
    }

    const headersObject = headersArrayToObject(substitutedHeaders);

    const substitutedValues = {
      ...values,
      url: substitutedUrl,
      headers: headersObject,
      data: substitutedData,
    };

    const encodedUrl = encodeRestClientUrl(substitutedValues);
    window.history.replaceState(null, '', encodedUrl);

    try {
      const requestData: RequestBody = {
        method,
        url: substitutedUrl,
        headers: headersObject,
        data: substitutedData,
        contentType,
      };

      const { response, durationMs } = await executeRestClientRequest(requestData);
      const statusCode = response.data.status;
      const requestSize = getSize(requestData);
      const responseSize = getSize(response?.data);

      if (response.data.error) {
        setError(response.data.error);
        await saveRequestLog({
          url: requestData.url,
          appRouterURL: encodedUrl,
          method,
          requestSize,
          responseSize,
          durationMs,
          errorDetails: response.data.error,
        });
      } else {
        setResponse(response.data);
        const errorText =
          statusCode !== undefined && statusCode >= 400 && statusCode < 600
            ? response.data.statusText || `HTTP ${statusCode}`
            : '';
        await saveRequestLog({
          url: requestData.url,
          appRouterURL: encodedUrl,
          method,
          statusCode,
          requestSize,
          responseSize,
          durationMs,
          errorDetails: errorText,
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

        <Button
          type="primary"
          data-testid="generated-code-button"
          style={{ width: '100%' }}
          onClick={() => setModalOpen(true)}
        >
          {t('generatedCode')}
        </Button>

        <Response loading={loading} error={error} response={response} />
        <Modal
          title={t('modalTitle')}
          centered
          open={modalOpen}
          footer={null}
          onCancel={() => setModalOpen(false)}
        >
          <CodeGeneration request={formValues} />
        </Modal>
      </Flex>
    </Content>
  );
}
