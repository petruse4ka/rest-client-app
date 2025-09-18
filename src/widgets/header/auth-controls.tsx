import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/shared/i18n/navigation';
import { useAuth } from '@/shared/provider/auth-provider';

import { Button, Flex, Tooltip } from 'antd';
import { appRoutes } from '@/shared/config/navigation';
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

export default function AuthControls() {
  const t = useTranslations('NavInfo');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { isLogin, user } = useAuth();

  const goSignIn = () => router.push(appRoutes.signIn);
  const goSignUp = () => router.push(appRoutes.signUp);
  const goMainPage = () => router.push(appRoutes.home);

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
    <Flex gap="middle" align="center" justify="flex-end">
      {isLogin ? (
        <>
          <Button
            size="small"
            type="default"
            icon={<HomeOutlined />}
            onClick={goMainPage}
            loading={loading}
          >
            {t('home')}
          </Button>
          <Tooltip title={user?.name || 'User'}>
            <Button size="small" shape="circle" icon={<UserOutlined />} />
          </Tooltip>
          <Tooltip title={t('signOut')}>
            <Button
              size="small"
              type="default"
              onClick={handleSignOut}
              loading={loading}
              icon={<LogoutOutlined />}
              data-testid="sign-out-btn"
            />
          </Tooltip>
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
