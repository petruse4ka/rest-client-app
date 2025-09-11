import { localStorageController } from '@/shared/utils';
import { VariablesData } from '@/types/types';
import { Button, Empty, Flex, Form, Popconfirm, Space, Table, TableProps, Typography } from 'antd';
import { useEffect, useState } from 'react';
import EditableCell from './editable-cell';
import TableOperation from './operation';
const { Text } = Typography;

export default function EditableTable() {
  const [form] = Form.useForm();
  const [data, setData] = useState<VariablesData[]>([]);
  const [isAddItem, setIsAddItem] = useState(false);
  const [editingKey, setEditingKey] = useState<number>(0);

  const editItem = async (record: Partial<VariablesData> & { key: number }) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  const saveItem = async (key: React.Key) => {
    const value = (await form.validateFields()) as VariablesData;
    setData((prev) => prev.map((item) => (item.key === key ? { ...item, ...value } : item)));
    setEditingKey(0);
    setIsAddItem(false);
  };

  useEffect(() => {
    const stored = localStorageController.get('rest-variables');
    setData(stored || []);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const lastItem = data[data.length - 1];
      const { variable, value } = lastItem;
      const isNotEmpty = variable !== '' && value !== '';
      if (isNotEmpty) {
        localStorageController.set('rest-variables', data);
      }
    } else {
      localStorage.removeItem('rest-variables');
    }
  }, [data]);

  const deleteItem = (key: number) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);

    if (editingKey == key) {
      setIsAddItem(false);
      setEditingKey(0);
    }
  };

  const columns = [
    {
      title: 'Variable',
      dataIndex: 'variable',
      key: 'variable',
      width: '40%',
      editable: true,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '40%',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',
      width: '20%',
      render: (_: unknown, record: VariablesData) => {
        return (
          <TableOperation
            record={record}
            editingKey={editingKey}
            saveItem={saveItem}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        );
      },
    },
  ];

  const mergedColumns: TableProps<VariablesData>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: VariablesData) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: record.key === editingKey,
        data,
      }),
    };
  });

  const addItem = () => {
    const newItem = {
      key: Date.now(),
      variable: '',
      value: '',
    };
    setData((prev) => [...prev, newItem]);
    editItem(newItem);
    setIsAddItem(true);
  };

  return (
    <Flex vertical gap={20}>
      <Form form={form}>
        {data.length === 0 ? (
          <Empty description={<Text>List of variables is empty</Text>}></Empty>
        ) : (
          <Table
            components={{
              body: { cell: EditableCell },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            pagination={false}
          />
        )}
      </Form>
      <Button
        style={data.length === 0 ? { alignSelf: 'center' } : { alignSelf: 'flex-end' }}
        onClick={addItem}
        disabled={isAddItem}
      >
        Add new variable
      </Button>
    </Flex>
  );
}
