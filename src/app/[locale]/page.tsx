'use client';

import { HeroSection } from '@/widgets';
import '@ant-design/v5-patch-for-react-19';
import { Content } from 'antd/es/layout/layout';

export default function Home() {
  return (
    <Content className="bg-animate">
      <HeroSection />
    </Content>
  );
}
