'use client';

import '@ant-design/v5-patch-for-react-19';
import { Flex } from 'antd';
import { Content } from 'antd/es/layout/layout';

export default function Home() {
  return (
    <Content className="h-svh">
      <Flex>test</Flex>
    </Content>
  );
}
