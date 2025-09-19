import { Col, Flex, Row } from 'antd';
import InterfaceSettings from './interface-settings';
import Navigation from './navigation';
import AuthControls from './auth-controls';
import Logo from './logo';
import { AppUser } from '@/types/types';

type DesktopHeaderProps = {
  user: AppUser;
};

export default function DesktopHeader({ user }: DesktopHeaderProps) {
  const isLogin = !!user;
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
        <AuthControls user={user} />
      </Col>
    </Row>
  );
}
