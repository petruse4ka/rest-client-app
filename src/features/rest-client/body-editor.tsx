import { ContentType } from '@/types/types';
import { Button, Flex, Input, Select, Space, Typography } from 'antd';
import { FormatPainterOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { getBodyPlaceholder, validateJson } from '@/shared/utils';
import { prettifyJson } from '@/shared/utils';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface BodyEditorProps {
  value: string;
  contentType: ContentType;
  handleBodyChange: (value: string, contentType: ContentType) => void;
}

export function BodyEditor({ value, contentType, handleBodyChange }: BodyEditorProps) {
  const t = useTranslations('RestClient');
  const [jsonIsValid, setJsonIsValid] = useState(true);
  const contentTypes = Object.values(ContentType);

  const handleTextValueChange = (newValue: string) => {
    handleBodyChange(newValue, contentType);
    const isValidJson = validateJson(newValue, contentType);
    setJsonIsValid(isValidJson);
  };

  const handleJsonValueChange = (newContentType: ContentType) => {
    handleBodyChange(value, newContentType);
    const isValidJson = validateJson(value, newContentType);
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
              onClick={() => prettifyJson(value, contentType, handleBodyChange, setJsonIsValid)}
              disabled={!value.trim() || !jsonIsValid}
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
