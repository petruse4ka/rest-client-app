import { Col, Flex, Row } from 'antd';
import InterfaceSettings from './interface-settings';
import Navigation from './navigation';
import AuthControls from './auth-controls';
import Logo from './logo';
import { useAuth } from '@/shared/provider/auth-provider';

export default function DesktopHeader() {
  const { isLogin } = useAuth();
  return (
    <Row
      align="middle"
      justify="space-between"
      style={{ height: '100%' }}
      data-testid="desktop-header"
    >
      <Col span={5}>
        <InterfaceSettings />
      </Col>
      <Col flex="auto">
        <Flex gap="middle" align="center" justify="center">
          <Logo size={40} />
          {isLogin && <Navigation />}
        </Flex>
      </Col>

      <Col span={5}>
        <AuthControls />
      </Col>
    </Row>
  );
}
