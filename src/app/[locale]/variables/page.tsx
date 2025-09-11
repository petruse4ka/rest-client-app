'use client';

import { Flex } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { CSSProperties } from 'react';
import EditableTable from '@/features/editable-table';

const contentStyles: CSSProperties = {
  height: '100%',
  padding: '0 20px',
  textAlign: 'center',
};

export default function VariablesPage() {
  return (
    <Content style={contentStyles}>
      <Flex vertical gap={20}>
        <Title>Variables</Title>
        <EditableTable />
      </Flex>
    </Content>
  );
}
