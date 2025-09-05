import { Flex } from 'antd';
import InterfaceSettings from './InterfaceSettings';
import Link from 'next/link';
import Navigation from './Navigation';
import AuthControls from './AuthControls';

export default function DesctopHeader({ isLogin }: { isLogin: boolean }) {
  return (
    <>
      <InterfaceSettings />
      <Flex gap="middle" align="center">
        <Link href="/">
          <img src="./logo.png" alt="Logo company" className="w-10" />
        </Link>
        {isLogin && <Navigation />}
      </Flex>
      <AuthControls isLogin={isLogin} />
    </>
  );
}
