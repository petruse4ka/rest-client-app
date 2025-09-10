'use client';

import { Flex, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Table from 'antd/es/table';
import Title from 'antd/es/typography/Title';
import { CSSProperties } from 'react';
import { Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Text } = Typography;

const contentStyles: CSSProperties = {
  height: '100%',
  padding: '0 20px',
  textAlign: 'center',
};

const dataSource = [
  {
    key: '1',
    variable: 'Mike',
    value: 32,
  },
  {
    key: '2',
    variable: 'John',
    value: 42,
  },
];

const columns = [
  {
    title: 'Variable',
    dataIndex: 'variable',
    key: 'variable',
    width: '40%',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    width: '40%',
  },
  {
    title: 'Operation',
    dataIndex: 'operation',
    key: 'operation',
    width: '20%',
    render: () => (
      <Space size="large">
        <EditOutlined style={{ cursor: 'pointer' }} />
        <DeleteOutlined style={{ cursor: 'pointer' }} />
      </Space>
    ),
  },
];

export default function VariablesPage() {
  return (
    <Content style={contentStyles}>
      <Flex vertical gap={20}>
        <Title>Variables</Title>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </Flex>
    </Content>
  );
}
