import { Header } from '@/types/interfaces';
import { Button, Empty, Flex, Table, Typography, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HeadersCell from './headers-cell';
import HeadersControls from './headers-controls';
import { useTranslations } from 'next-intl';

const { Text } = Typography;

export function HeadersEditor() {
  const t = useTranslations('RestClient');
  const form = Form.useFormInstance();
  const headers = Form.useWatch('headers', form) || [];

  const addHeader = () => {
    const newHeader: Header = {
      key: '',
      value: '',
      id: Date.now() + Math.random(),
    };
    const currentHeaders = form.getFieldValue('headers') || [];

    const newHeaders = [...currentHeaders, { ...newHeader }];
    form.setFieldValue('headers', newHeaders);
  };

  const updateHeader = (id: number, field: 'key' | 'value', value: string) => {
    const currentHeaders = form.getFieldValue('headers') || [];
    const updatedHeaders = currentHeaders.map((header: Header) =>
      header.id === id ? { ...header, [field]: value } : header
    );

    form.setFieldValue('headers', updatedHeaders);
  };

  const deleteHeader = (id: number) => {
    const currentHeaders = form.getFieldValue('headers') || [];
    const updatedHeaders = currentHeaders.filter((header: Header) => header.id !== id);

    form.setFieldValue('headers', updatedHeaders);
  };

  const columns = [
    {
      title: t('headerKey'),
      dataIndex: 'key',
      key: 'key',
      ellipsis: true,
      editable: true,
      render: (value: string, record: Header) => (
        <HeadersCell
          value={value}
          onChange={(newValue) => updateHeader(record.id as number, 'key', newValue)}
          placeholder={t('placeholderKey')}
          dataIndex={`headers[${record.id}].key`}
        />
      ),
    },
    {
      title: t('headerValue'),
      dataIndex: 'value',
      key: 'value',
      ellipsis: true,
      editable: true,
      render: (value: string, record: Header) => (
        <HeadersCell
          value={value}
          onChange={(newValue) => updateHeader(record.id as number, 'value', newValue)}
          placeholder={t('placeholderValue')}
          dataIndex={`headers[${record.id}].value`}
        />
      ),
    },
    {
      title: '',
      key: 'operation',
      width: 50,
      render: (_: unknown, record: Header) => (
        <HeadersControls deleteItem={() => deleteHeader(record.id as number)} />
      ),
    },
  ];

  return (
    <Flex vertical gap={20}>
      <Text strong>{t('headers')}</Text>
      {headers.length === 0 ? (
        <Empty description={<Text>{t('noHeaders')}</Text>} />
      ) : (
        <Table
          bordered
          dataSource={headers}
          columns={columns}
          pagination={false}
          size="small"
          rowKey="id"
        />
      )}
      <Button
        icon={<PlusOutlined />}
        style={headers.length === 0 ? { alignSelf: 'center' } : { alignSelf: 'flex-end' }}
        onClick={addHeader}
        size="small"
        data-testid="add-header-button"
      >
        {t('addHeader')}
      </Button>
    </Flex>
  );
}
