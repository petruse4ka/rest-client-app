import { Col, Flex, Row } from 'antd';
import InterfaceSettings from './interface-settings';
import Navigation from './navigation';
import AuthControls from './auth-controls';
import Logo from './logo';
import { useAuth } from '@/shared/provider/auth-provider';

export default function DesktopHeader() {
  const { isLogin } = useAuth();
  return (
    <Row align="middle" justify="space-between" style={{ height: '100%' }}>
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
