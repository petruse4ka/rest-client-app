import { Content } from 'antd/es/layout/layout';
import { AuthWidget } from '@/widgets';

export default function SignIpPage() {
  return (
    <Content className="flex h-svh items-center justify-center px-4">
      <AuthWidget />
    </Content>
  );
}
