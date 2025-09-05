import { Button, Flex } from 'antd';

export default function AuthControls({ isLogin }: { isLogin: boolean }) {
  return (
    <>
      {isLogin ? (
        <Button type="primary" className="!md:bg-black">
          Logout
        </Button>
      ) : (
        <Flex gap="middle">
          <Button type="primary">Sign In</Button>
          <Button type="primary">Sign Up</Button>
        </Flex>
      )}
    </>
  );
}
