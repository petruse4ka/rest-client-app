import { Header } from '@/types/interfaces';
import { Button, Empty, Flex, Table, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HeadersCell from './headers-cell';
import HeadersControls from './headers-controls';
import { useTranslations } from 'next-intl';

const { Text } = Typography;

type HeadersEditorProps = {
  headers: Header[];
  onChange: (headers: Header[]) => void;
};

export function HeadersEditor({ headers, onChange }: HeadersEditorProps) {
  const t = useTranslations('RestClient');

  const addHeader = () => {
    const newHeader: Header = {
      key: '',
      value: '',
      id: Date.now(),
    };
    onChange([...headers, newHeader]);
  };

  const updateHeader = (id: number, field: 'key' | 'value', value: string) => {
    const updatedHeaders = headers.map((header) =>
      header.id === id ? { ...header, [field]: value } : header
    );
    onChange(updatedHeaders);
  };

  const deleteHeader = (id: number) => {
    const updatedHeaders = headers.filter((header) => header.id !== id);
    onChange(updatedHeaders);
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
      width: 100,
      render: (_: unknown, record: Header) => (
        <HeadersControls deleteItem={() => deleteHeader(record.id as number)} />
      ),
    },
  ];

  return (
    <Flex vertical gap={20}>
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
      >
        {t('addHeader')}
      </Button>
    </Flex>
  );
}
