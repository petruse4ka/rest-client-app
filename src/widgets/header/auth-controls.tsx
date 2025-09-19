import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/shared/i18n/navigation';

import { Button, Flex, Typography } from 'antd';
import { appRoutes } from '@/shared/config/navigation';

const { Text } = Typography;

export default function AuthControls() {
  const t = useTranslations('NavInfo');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [isLogin, setIsLigin] = useState<boolean>(false);

  const user = { name: 'user' };

  const goSignIn = () => router.push(appRoutes.signIn);
  const goSignUp = () => router.push(appRoutes.signUp);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await fetch('/api/logout', { method: 'POST' });
      router.push(appRoutes.home);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex gap="middle" align="center">
      {isLogin ? (
        <>
          <Text>{user?.name || 'User'}</Text>
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
