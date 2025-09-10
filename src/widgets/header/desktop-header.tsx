import { Col, Flex, Row } from 'antd';
import InterfaceSettings from './interface-settings';
import Navigation from './navigation';
import AuthControls from './auth-controls';
import Logo from './logo';

export default function DesktopHeader({ isLogin }: { isLogin: boolean }) {
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
        <AuthControls isLogin={isLogin} />
      </Col>
    </Row>
  );
}
