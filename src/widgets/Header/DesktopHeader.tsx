import { Col, Flex, Row } from 'antd';
import InterfaceSettings from './InterfaceSettings';
import Navigation from './Navigation';
import AuthControls from './AuthControls';
import Logo from './Logo';

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
