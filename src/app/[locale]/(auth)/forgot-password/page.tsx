import { CSSProperties } from 'react';
import { Content } from 'antd/es/layout/layout';
import { AuthWidget } from '@/widgets';

export default function ForgotPasswordPage() {
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
