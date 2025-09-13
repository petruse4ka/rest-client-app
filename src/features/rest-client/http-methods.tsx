import { HttpMethod } from '@/types/types';
import { Button, Form, Input, Select, Flex, Grid, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';

const { useBreakpoint } = Grid;
const { Option } = Select;
const { Item } = Form;
const { Title } = Typography;

interface HttpMethodsProps {
  loading: boolean;
  onMethodChange?: (method: HttpMethod) => void;
}

export function HttpMethods({ loading, onMethodChange }: HttpMethodsProps) {
  const t = useTranslations('RestClient');
  const httpMethods = Object.values(HttpMethod);
  const screens = useBreakpoint();

  return (
    <Flex vertical>
      <Title level={2}>{t('request')}</Title>
      <Flex
        gap={screens.md ? 'middle' : 'small'}
        align="end"
        wrap="nowrap"
        style={{ marginBottom: 24 }}
      >
        <Item
          name="method"
          label={t('method')}
          rules={[{ required: true, message: t('methodRequired') }]}
          style={{
            flex: '0 0 auto',
            ...(screens.md ? { minWidth: '115px' } : { width: '100px' }),
          }}
        >
          <Select data-testid="method-select" onChange={onMethodChange}>
            {httpMethods.map((method) => (
              <Option key={method} value={method}>
                {method}
              </Option>
            ))}
          </Select>
        </Item>

        <Item
          name="url"
          label={t('url')}
          rules={[{ required: true, message: t('urlRequired') }]}
          style={{ flex: 1, minWidth: '130px' }}
        >
          <Input data-testid="url-input" placeholder={t('urlPlaceholder')} />
        </Item>

        <Item
          style={{
            flex: '0 0 auto',
            textAlign: 'center',
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SendOutlined />}
            data-testid="send-button"
          >
            {screens.md ? t('sendRequest') : ''}
          </Button>
        </Item>
      </Flex>
    </Flex>
  );
}
