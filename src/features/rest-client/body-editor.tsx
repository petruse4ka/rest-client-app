import { ContentType } from '@/types/types';
import { Button, Flex, Input, Select, Space, Typography, Form } from 'antd';
import { FormatPainterOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { getBodyPlaceholder, validateJson } from '@/shared/utils';
import { prettifyJson } from '@/shared/utils';

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

  const handleTextValueChange = (newValue: string) => {
    form.setFieldValue('data', newValue);
    const isValidJson = validateJson(newValue, contentType);
    setJsonIsValid(isValidJson);
  };

  const handleJsonValueChange = (newContentType: ContentType) => {
    form.setFieldValue('contentType', newContentType);
    const isValidJson = validateJson(data, newContentType);
    setJsonIsValid(isValidJson);
  };

  return (
    <Flex vertical style={{ marginBottom: 16 }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Text strong>{t('body')}</Text>
        <Space>
          {contentType === ContentType.JSON && (
            <Button
              icon={<FormatPainterOutlined />}
              onClick={() =>
                prettifyJson(
                  data,
                  contentType,
                  (value, contentType) => {
                    form.setFieldValue('data', value);
                    form.setFieldValue('contentType', contentType);
                  },
                  setJsonIsValid
                )
              }
              disabled={!data.trim() || !jsonIsValid}
              size="small"
            >
              {t('prettify')}
            </Button>
          )}
          <Select
            value={contentType}
            onChange={handleJsonValueChange}
            style={{ minWidth: '75px', marginTop: '1px' }}
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
        onChange={(e) => handleTextValueChange(e.target.value)}
        placeholder={getBodyPlaceholder(contentType, t('bodyPlaceholder'))}
        rows={8}
        style={{
          fontFamily: 'monospace',
          borderColor: !jsonIsValid ? '#ff4d4f' : undefined,
        }}
      />

      {!jsonIsValid && <Text type="danger">{t('invalidJson')}</Text>}
    </Flex>
  );
}
