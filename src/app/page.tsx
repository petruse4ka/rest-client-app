'use client';

import '@ant-design/v5-patch-for-react-19';
import { Select, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import useToken from 'antd/es/theme/useToken';

export default function Home() {
  const { token } = theme.useToken();

  return (
    <Content className="h-svh">
      <span className="text-white md:text-black">Content</span>
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

      <div style={{ color: token.colorPrimary }}>Consume Design Token</div>
    </Content>
  );
}
