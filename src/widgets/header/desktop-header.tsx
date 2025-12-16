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
  const isLoggedIn = !!user;
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
          {isLoggedIn && <Navigation />}
        </Flex>
      </Col>

      <Col span={5}>
        <AuthControls user={user} />
      </Col>
    </Row>
  );
}
