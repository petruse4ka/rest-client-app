import { Button, Flex } from 'antd';
import { useTranslations } from 'next-intl';

export default function AuthControls({ isLogin }: { isLogin: boolean }) {
  const t = useTranslations('Header');
  return (
    <>
      {isLogin ? (
        <Button type="primary" size="small">
          {t('signOut')}
        </Button>
      ) : (
        <Flex gap="middle">
          <Button type="primary" size="small">
            {t('signIn')}
          </Button>
          <Button type="primary" size="small">
            {t('signUp')}
          </Button>
        </Flex>
      )}
    </>
  );
}
