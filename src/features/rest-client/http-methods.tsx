import { HttpMethod } from '@/types/types';
import { Button, Form, Input, Select, Flex } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';

const { Option } = Select;
const { Item } = Form;

interface HttpMethodsProps {
  loading: boolean;
  onMethodChange?: (method: HttpMethod) => void;
}

export function HttpMethods({ loading, onMethodChange }: HttpMethodsProps) {
  const t = useTranslations('RestClient');
  const httpMethods = Object.values(HttpMethod);

  return (
    <Flex gap="large" align="end" style={{ marginBottom: 24 }}>
      <Item
        name="method"
        label={t('method')}
        rules={[{ required: true, message: t('methodRequired') }]}
      >
        <Select data-testid="method-select" onChange={onMethodChange}>
          {httpMethods.map((method) => (
            <Option key={method} value={method}>
              {method}
            </Option>
          ))}
        </Select>
      </Item>

      <Item name="url" label={t('url')} rules={[{ required: true, message: t('urlRequired') }]}>
        <Input data-testid="url-input" placeholder={t('urlPlaceholder')} />
      </Item>

      <Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={<SendOutlined />}
          data-testid="send-button"
        >
          {t('sendRequest')}
        </Button>
      </Item>
    </Flex>
  );
}
