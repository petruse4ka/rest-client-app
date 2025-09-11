import { VariablesData } from '@/types/types';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import Link from 'antd/es/typography/Link';

interface TableOperationProps {
  record: VariablesData;
  editingKey: number;
  saveItem: (key: number) => void;
  editItem: (record: VariablesData) => void;
  deleteItem: (key: number) => void;
}

export default function TableOperation({
  record,
  editingKey,
  saveItem,
  editItem,
  deleteItem,
}: TableOperationProps) {
  return (
    <Space size="large">
      {record.key === editingKey ? (
        <Link onClick={() => saveItem(record.key)}>
          <SaveOutlined />
        </Link>
      ) : (
        <Link disabled={editingKey !== 0} onClick={() => editItem(record)}>
          <EditOutlined />
        </Link>
      )}
      <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => deleteItem(record.key)} />
    </Space>
  );
}
