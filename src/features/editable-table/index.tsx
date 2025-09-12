import { localStorageController } from '@/shared/utils';
import { VariablesData } from '@/types/types';
import { Button, Empty, Flex, Form, Table, TableProps, Typography } from 'antd';
import { useEffect, useState } from 'react';
import EditableCell from './editable-cell';
import TableControls from './table-controls';
import { useTranslations } from 'next-intl';
const { Text } = Typography;

export default function EditableTable() {
  const t = useTranslations('Variables');
  const [form] = Form.useForm();
  const [data, setData] = useState<VariablesData[]>([]);
  const [editingKey, setEditingKey] = useState<number>(0);

  const editItem = async (record: Partial<VariablesData> & { key: number }) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  const saveItem = async (key: React.Key) => {
    try {
      const value = (await form.validateFields()) as VariablesData;
      setData((prev) => prev.map((item) => (item.key === key ? { ...item, ...value } : item)));
      setEditingKey(0);
    } catch {}
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
    }
  }, [data]);

  const deleteItem = (key: number) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);

    if (editingKey == key) {
      setEditingKey(0);
    }

    if (newData.length === 0) {
      localStorageController.remove('rest-variables');
    }
  };

  const columns = [
    {
      title: t('columns.variable'),
      dataIndex: 'variable',
      key: 'variable',
      ellipsis: true,
      editable: true,
    },
    {
      title: t('columns.value'),
      dataIndex: 'value',
      key: 'value',
      ellipsis: true,
      editable: true,
    },
    {
      title: t('columns.controls'),
      dataIndex: 'operation',
      key: 'operation',
      width: 100,
      render: (_: unknown, record: VariablesData) => {
        return (
          <TableControls
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
  };

  return (
    <Flex vertical gap={20}>
      <Form form={form}>
        {data.length === 0 ? (
          <Empty description={<Text>{t('empty')}</Text>}></Empty>
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
        disabled={editingKey !== 0}
      >
        {t('btn')}
      </Button>
    </Flex>
  );
}
