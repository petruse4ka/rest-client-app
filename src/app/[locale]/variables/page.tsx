'use client';

import { Flex, Form, Input, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Table, { TableProps } from 'antd/es/table';
import Title from 'antd/es/typography/Title';
import { CSSProperties, HTMLAttributes, useState } from 'react';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';

const { Item } = Form;

interface DataType {
  key: string;
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
    key: '1',
    variable: 'Mike',
    value: '32',
  },
  {
    key: '2',
    variable: 'John',
    value: '32',
  },
];

export default function VariablesPage() {
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>(dataSource);

  const [editingKey, setEditingKey] = useState('');

  const editItem = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  const saveItem = (key: React.Key) => {
    const value = form.getFieldsValue();
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...value,
      });
      setData(newData);
      setEditingKey('');
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
        return record.key === editingKey ? (
          <Link onClick={() => saveItem(record.key)}>
            <SaveOutlined />
          </Link>
        ) : (
          <Space size="large">
            <Link onClick={() => editItem(record)}>
              <EditOutlined />
            </Link>
            <DeleteOutlined style={{ cursor: 'pointer' }} />
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
