import { ContentType } from '@/types/types';
import { Button, Flex, Input, Select, Space, Typography, Form } from 'antd';
import { FormatPainterOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';
import { getBodyPlaceholder, validateJson } from '@/shared/utils';
import { prettifyJson } from '@/shared/utils';
import { substituteVariables } from '@/shared/utils';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export function BodyEditor() {
  const t = useTranslations('RestClient');
  const form = Form.useFormInstance();
  const [jsonIsValid, setJsonIsValid] = useState(true);
  const contentTypes = Object.values(ContentType);
  const data = Form.useWatch('data', form) || '';
  const contentType = Form.useWatch('contentType', form) || ContentType.JSON;

  const handleBodyValueChange = useCallback(
    (newValue: string) => {
      form.setFieldValue('data', newValue);
      const isValidJson = validateJson(substituteVariables(newValue), contentType);
      setJsonIsValid(isValidJson);
    },
    [form, contentType]
  );

  const handleBodyTypeChange = useCallback(
    (newContentType: ContentType) => {
      form.setFieldValue('contentType', newContentType);
      const isValidJson = validateJson(substituteVariables(data), newContentType);
      setJsonIsValid(isValidJson);
    },
    [form, data]
  );

  const handlePrettifyJson = useCallback(() => {
    const prettifiedValue = prettifyJson(substituteVariables(data), contentType);
    if (prettifiedValue !== null) {
      form.setFieldValue('data', prettifiedValue);
      setJsonIsValid(true);
    } else {
      setJsonIsValid(false);
    }
  }, [form, data, contentType]);

  return (
    <Flex vertical style={{ marginBottom: 16 }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Text strong>{t('body')}</Text>
        <Space>
          <Button
            icon={<FormatPainterOutlined />}
            onClick={handlePrettifyJson}
            disabled={
              contentType !== ContentType.JSON || !substituteVariables(data).trim() || !jsonIsValid
            }
            size="small"
            data-testid="prettify-button"
          >
            {t('prettify')}
          </Button>
          <Select
            value={contentType}
            onChange={handleBodyTypeChange}
            style={{ minWidth: '75px', marginTop: '1px' }}
            data-testid="content-type-select"
          >
            {contentTypes.map((contentType) => (
              <Option key={contentType} value={contentType}>
                {contentType}
              </Option>
            ))}
          </Select>
        </Space>
      </Flex>

      <TextArea
        value={data}
        onChange={(e) => handleBodyValueChange(e.target.value)}
        placeholder={getBodyPlaceholder(contentType, t('bodyPlaceholder'))}
        rows={8}
        style={{
          fontFamily: 'monospace',
          borderColor: !jsonIsValid ? '#ff4d4f' : undefined,
        }}
        data-testid="body-textarea"
      />

      {!jsonIsValid && (
        <Text type="danger" data-testid="invalid-json-error">
          {t('invalidJson')}
        </Text>
      )}
    </Flex>
  );
}
