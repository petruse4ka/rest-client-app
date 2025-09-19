import { CSSProperties } from 'react';
import { Content } from 'antd/es/layout/layout';
import AuthClientWrapper from '../auth-client-wrapper';

export default function SignIpPage() {
  const contentStyles: CSSProperties = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  };

  return (
    <Content style={contentStyles}>
      <AuthClientWrapper />
    </Content>
  );
}
