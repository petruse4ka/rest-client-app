import { Button, Flex, Typography } from 'antd';
import Link from 'next/link';
const { Title, Text } = Typography;

export function HeroSection() {
  return (
    <Flex
      align="center"
      justify="center"
      vertical
      gap={40}
      style={{ height: 'calc(100svh - 63px)', textAlign: 'center' }}
    >
      <Flex align="center" justify="center" vertical>
        <Title>REST Client App</Title>
        <Text style={{ fontSize: '1.5rem' }}>A tool for testing and sending HTTP requests</Text>
      </Flex>
      <Flex gap={20}>
        <Link href="/">
          <Button type="primary" size="large">
            Sign In
          </Button>
        </Link>
        <Link href="/">
          <Button type="primary" size="large">
            Sign Up
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
