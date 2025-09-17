'use client';

import '@ant-design/v5-patch-for-react-19';
import { Content } from 'antd/es/layout/layout';
import { AboutCourseSection, HeroSection, TeamSection } from '@/widgets';

export default function Home() {
  return (
    <Content className="bg-animate">
      <HeroSection />
      <TeamSection />
      <AboutCourseSection />
    </Content>
  );
}
