import 'server-only';

import '@ant-design/v5-patch-for-react-19';
import { Content } from 'antd/es/layout/layout';
import { AboutCourseSection, HeaderApp, HeroSection, TeamSection } from '@/widgets';
import { getServerUser } from '@/server/get-server-user';

export default async function Home() {
  const userServer = await getServerUser();
  const user = userServer ? { name: userServer.name } : null;
  return (
    <>
      <HeaderApp user={user} />
      <Content className="bg-animate">
        <HeroSection user={user} />
        <TeamSection />
        <AboutCourseSection />
      </Content>
    </>
  );
}
