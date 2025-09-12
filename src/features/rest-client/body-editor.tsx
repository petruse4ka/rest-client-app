import { ContentType } from '@/types/types';
import { Button, Flex, Input, Select, Space, Typography } from 'antd';
import { FormatPainterOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { getBodyPlaceholder, validateJson } from '@/shared/utils';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface BodyEditorProps {
  value: string;
  contentType: ContentType;
  handleContentTypeChange: (value: string, contentType: ContentType) => void;
}

export function BodyEditor({ value, contentType, handleContentTypeChange }: BodyEditorProps) {
  const t = useTranslations('RestClient');
  const [jsonIsValid, setJsonIsValid] = useState(true);
  const contentTypes = Object.values(ContentType);

  const handleTextValueChange = (newValue: string) => {
    handleContentTypeChange(newValue, contentType);
    const isValidJson = validateJson(newValue, contentType);
    setJsonIsValid(isValidJson);
  };

  const handleJsonValueChange = (newContentType: ContentType) => {
    handleContentTypeChange(value, newContentType);
    const isValidJson = validateJson(value, newContentType);
    setJsonIsValid(isValidJson);
  };

  return (
    <Flex vertical justify="space-between" align="center" style={{ marginBottom: 16 }}>
      <Text strong>{t('body')}</Text>
      <Space>
        <Select value={contentType} onChange={handleJsonValueChange}>
          {contentTypes.map((contentType) => (
            <Option key={contentType} value={contentType}>
              {contentType}
            </Option>
          ))}
        </Select>
        {contentType === ContentType.JSON && (
          <Button
            icon={<FormatPainterOutlined />}
            onClick={() => {
              console.log('prettify later');
            }}
            disabled={!value.trim()}
            size="small"
          >
            {t('prettify')}
          </Button>
        )}
      </Space>

      <TextArea
        value={value}
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
