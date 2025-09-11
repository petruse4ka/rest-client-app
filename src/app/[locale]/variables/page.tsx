'use client';

import { Button, Flex, Form, Input, Popconfirm, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Table, { TableProps } from 'antd/es/table';
import Title from 'antd/es/typography/Title';
import { CSSProperties, HTMLAttributes, useState } from 'react';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';

const { Item } = Form;

interface DataType {
  key: number;
  variable: string;
  value: string;
}

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
}

const contentStyles: CSSProperties = {
  height: '100%',
  padding: '0 20px',
  textAlign: 'center',
};

const dataSource = [
  {
    key: 1,
    variable: 'Mike',
    value: '32',
  },
  {
    key: 2,
    variable: 'John',
    value: '32',
  },
];

export default function VariablesPage() {
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>(dataSource);
  const [isAddItem, setIsAddItem] = useState(false);
  const [editingKey, setEditingKey] = useState<number>(0);

  const editItem = async (record: Partial<DataType> & { key: number }) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  const saveItem = async (key: React.Key) => {
    const value = (await form.validateFields()) as DataType;

    const newData = [...data];
    console.log(newData);
    const index = newData.findIndex((item) => key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...value,
      });
      setData(newData);
      setEditingKey(0);
      setIsAddItem(false);
    }
  };

  const deleteItem = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);

    if (editingKey == key) {
      setIsAddItem(false);
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
      render: (_: unknown, record: DataType) => {
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
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteItem(record.key)}>
              <DeleteOutlined style={{ cursor: 'pointer' }} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns: TableProps<DataType>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: record.key === editingKey,
      }),
    };
  });

  const addItem = () => {
    const newData = [...data];
    const newItem = {
      key: Date.now(),
      variable: '',
      value: '',
    };

    newData.push(newItem);
    setData(newData);
    editItem(newItem);
    setIsAddItem(true);
  };

  return (
    <Content style={contentStyles}>
      <Flex vertical gap={20}>
        <Title>Variables</Title>
        <Form form={form}>
          <Table
            components={{
              body: { cell: EditableCell },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            pagination={false}
          />
        </Form>
        <Button style={{ alignSelf: 'flex-end' }} onClick={addItem} disabled={isAddItem}>
          Add new variable
        </Button>
      </Flex>
    </Content>
  );
}

function EditableCell(props: EditableCellProps) {
  const { editing, dataIndex, title, children } = props;

  return (
    <td>
      {editing ? (
        <Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Item>
      ) : (
        children
      )}
    </td>
  );
}
