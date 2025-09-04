'use client';

import '@ant-design/v5-patch-for-react-19';
import { Select } from 'antd';
import { Content } from 'antd/es/layout/layout';

export default function Home() {
  return (
    <Content className="h-svh">
      <span>Content</span>
      <Select
        defaultValue={{ value: 'ru', label: 'RU' }}
        style={{ width: 70 }}
        onChange={() => {}}
        options={[
          { value: 'ru', label: 'RU' },
          { value: 'en', label: 'EN' },
          { value: 'be', label: 'BE' },
        ]}
      />
    </Content>
  );
}
