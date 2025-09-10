import { Button, Flex } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/shared/i18n/navigation';
import { useState } from 'react';
import { apiSignOut } from '@/shared/api/firebase/auth';

export default function AuthControls({ isLogin }: { isLogin: boolean }) {
  const t = useTranslations('Header');
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
    <>
      {isLogin ? (
        <Button type="primary" onClick={handleSignOut} loading={loading}>
          {t('signOut')}
        </Button>
      ) : (
        <Flex gap="middle">
          <Button type="primary" onClick={goSignIn}>
            {t('signIn')}
          </Button>
          <Button type="primary" onClick={goSignUp}>
            {t('signUp')}
          </Button>
        </Flex>
      )}
    </>
  );
}

