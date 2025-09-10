import { CSSProperties } from 'react';
import { AuthWidget } from '@/widgets/';
import { Content } from 'antd/es/layout/layout';

export default function SignUpPage() {
  const contentStyles: CSSProperties = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  };

  return (
    <Content style={contentStyles}>
      <AuthWidget />
    </Content>
  );
}
