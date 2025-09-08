import { Button, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';

export function HeroSection() {
  return (
    <Flex
      align="center"
      justify="center"
      vertical
      gap={40}
      style={{ height: 'calc(100svh - 63px)' }}
    >
      <Flex align="center" justify="center" vertical>
        <Title>REST Client App</Title>
        <Title level={2} type="secondary">
          A tool for testing and sending HTTP requests
        </Title>
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
