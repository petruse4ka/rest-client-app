import { Button, Flex, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/shared/i18n/navigation';
import { useState } from 'react';
import { apiSignOut } from '@/shared/api/firebase/auth';

const { Text } = Typography;

export default function AuthControls({ isLogin }: { isLogin: boolean }) {
  const t = useTranslations('NavInfo');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const goSignIn = () => router.push('/sign-in');
  const goSignUp = () => router.push('/sign-up');

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await apiSignOut();
      router.push('/');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex gap="middle" align="center">
      {isLogin ? (
        <>
          <Text>User name</Text>
          <Button size="small" type="primary" onClick={handleSignOut} loading={loading}>
            {t('signOut')}
          </Button>
        </>
      ) : (
        <>
          <Button size="small" type="primary" onClick={goSignIn}>
            {t('signIn')}
          </Button>
          <Button size="small" type="primary" onClick={goSignUp}>
            {t('signUp')}
          </Button>
        </>
      )}
    </Flex>
  );
}
