import { Header } from '@/types/interfaces';
import { Button, Table, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';

const { Text } = Typography;

interface HeadersEditorProps {
  headers: Header[];
  onChange: (headers: Header[]) => void;
}

export function HeadersEditor({ headers }: HeadersEditorProps) {
  const t = useTranslations('RestClient');

  const columns = [
    {
      title: t('headerKey'),
      dataIndex: 'key',
      key: 'key',
      width: '50%',
    },
    {
      title: t('headerValue'),
      dataIndex: 'value',
      key: 'value',
      width: '50%',
    },
  ];

  return (
    <>
      <Text strong>{t('headers')}</Text>
      <Button type="dashed" icon={<PlusOutlined />} size="small">
        {t('addHeader')}
      </Button>

      <Table
        bordered
        dataSource={headers}
        columns={columns}
        pagination={false}
        size="small"
        rowKey="id"
        locale={{
          emptyText: t('noHeaders'),
        }}
      />
    </>
  );
}
