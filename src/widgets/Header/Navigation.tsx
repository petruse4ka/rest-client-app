import { Flex } from 'antd';
import Link from 'next/link';

export default function Navigation() {
  return (
    <Flex gap="middle" className="md:hidden">
      <Link href="/">Home</Link>
      <Link href="/rest-client">REST Client</Link>
      <Link href="/history">History</Link>
      <Link href="/variables">Variables</Link>
    </Flex>
  );
}
