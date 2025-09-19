import { Col, Flex, Row } from 'antd';
import InterfaceSettings from './interface-settings';
import Navigation from './navigation';
import AuthControls from './auth-controls';
import Logo from './logo';
import { useAuth } from '@/shared/provider/auth-provider';
import { useState } from 'react';

export default function DesktopHeader() {
  const [isLogin, setIsLigin] = useState<boolean>(false);
  return (
    <Row
      align="middle"
      justify="space-between"
      style={{ height: '100%' }}
      data-testid="desktop-header"
    >
      <Col>
        <InterfaceSettings />
      </Col>
      <Col flex="auto" style={{ textAlign: 'center' }}>
        <Flex gap="middle" align="center" justify="center">
          <Logo />
          {isLogin && <Navigation />}
        </Flex>
      </Col>

      <Col>
        <AuthControls />
      </Col>
    </Row>
  );
}
