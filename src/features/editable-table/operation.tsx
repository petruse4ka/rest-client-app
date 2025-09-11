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
  const isEditing = record.key === editingKey;
  const isNotEditable = editingKey !== 0;

  return (
    <Space size="large">
      {isEditing ? (
        <Link onClick={() => saveItem(record.key)}>
          <SaveOutlined />
        </Link>
      ) : (
        <Link disabled={isNotEditable} onClick={() => editItem(record)}>
          <EditOutlined />
        </Link>
      )}
      <Link disabled={!isEditing && isNotEditable} onClick={() => deleteItem(record.key)}>
        <DeleteOutlined />
      </Link>
    </Space>
  );
}
