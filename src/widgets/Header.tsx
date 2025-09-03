import { Button, Flex } from 'antd';
import { Header } from 'antd/es/layout/layout';

export function HeaderApp() {
  return (
    <Header>
      <Flex justify="space-between" align="center">
        <img src="./logo.png" alt="Logo company" className="w-10" />
        <div>
          <Button type="primary">Sign In</Button>
          <Button type="primary" danger>
            Sign Up
          </Button>
        </div>
      </Flex>
    </Header>
  );
}
