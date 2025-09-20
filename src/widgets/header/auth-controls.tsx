import { CSSProperties, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/shared/i18n/navigation';

import { Button, Flex, Popconfirm, Tooltip } from 'antd';
import { appRoutes } from '@/shared/config/navigation';
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { AppUser } from '@/types/types';

type AuthControlsProps = {
  user: AppUser;
  justify?: string;
};

export default function AuthControls({ user, justify = 'flex-end' }: AuthControlsProps) {
  const t = useTranslations('NavInfo');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isLogin = !!user;

  const goSign = (route: string) => {
    router.push(route, { scroll: false });
  };

  const goMainPage = () => router.push(appRoutes.home, { scroll: false });

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await fetch('/api/logout', { method: 'POST' });
      router.push(appRoutes.home, { scroll: false });
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex gap="middle" align="center" justify={justify}>
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
            <Button
              size="small"
              shape="circle"
              icon={<UserOutlined />}
              style={{ cursor: 'default' }}
            />
          </Tooltip>
          <Popconfirm
            title={t('confirmSignOut') || 'Вы уверены, что хотите выйти?'}
            okText={t('yes') || 'Да'}
            cancelText={t('cancel') || 'Отмена'}
            onConfirm={handleSignOut}
          >
            <Button
              size="small"
              type="default"
              loading={loading}
              icon={<LogoutOutlined />}
              data-testid="sign-out-btn"
            />
          </Popconfirm>
        </>
      ) : (
        <>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              goSign(appRoutes.signIn);
            }}
          >
            {t('signIn')}
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              goSign(appRoutes.signUp);
            }}
          >
            {t('signUp')}
          </Button>
        </>
      )}
    </Flex>
  );
}
