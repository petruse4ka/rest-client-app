'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import '@ant-design/v5-patch-for-react-19';

import { Link, usePathname, useRouter } from '@/shared/i18n/navigation';
import { apiSignUpWithGooglePopup } from '@/shared/api/firebase/auth';
import { mapGoogleAuthError } from '@/shared/api/firebase/map-google-error';
import { finalizeLogin } from '@/shared/lib/auth/finalize-login';

import { SignUpForm, SignInForm } from '@/features/auth/';
import { Button, Card, Divider, Flex, Radio, Typography } from 'antd';
import { Group } from 'antd/es/radio';

import { cardStyles, flexWrapperStyles } from './auth-widget.styles';
import { appRoutes } from '@/shared/config/navigation';

const { Title, Text } = Typography;

export function AuthWidget() {
  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations('Auth');

  const loginActive = pathname?.includes(appRoutes.signIn);

  const value = loginActive ? 'login' : 'signup';

  const [apiError, setApiError] = useState<string | null>(null);

  const handleGoogleAuth = async () => {
    try {
      setApiError(null);
      await apiSignUpWithGooglePopup();
      await finalizeLogin();
      router.replace(appRoutes.home);
      router.refresh();
    } catch (e) {
      const { key } = mapGoogleAuthError(e);
      setApiError(t(`apiErrors.${key}`));
    }
  };
  return (
    <Card style={cardStyles}>
      <Flex vertical style={flexWrapperStyles}>
        <Flex justify="flex-end" style={{ marginBottom: 12 }}>
          <Group
            value={value}
            optionType="button"
            buttonStyle="solid"
            onChange={(e) => {
              if (e.target.value === 'login') router.push(appRoutes.signIn);
              else router.push(appRoutes.signUp);
            }}
          >
            <Radio.Button value="login">{t('tabs.login')}</Radio.Button>
            <Radio.Button value="signup">{t('tabs.signup')}</Radio.Button>
          </Group>
        </Flex>

        <Title level={3}>{t(`titles.${value}`)}</Title>

        {loginActive ? <SignInForm /> : <SignUpForm />}

        <Flex justify="center">
          <Text type="secondary">
            {t(loginActive ? 'cta.noAccount' : 'cta.haveAccount')} {t('cta.click')}{' '}
            <Link href={loginActive ? appRoutes.signUp : appRoutes.signIn}>{t('cta.here')}</Link>{' '}
            {t(loginActive ? 'cta.signUpSuffix' : 'cta.loginSuffix')}
          </Text>
        </Flex>

        <Divider plain>{t('or')}</Divider>

        {apiError && (
          <Flex justify="center" style={{ marginBottom: 8 }}>
            <Text type="danger">{apiError}</Text>
          </Flex>
        )}

        <Flex justify="center">
          <Button onClick={handleGoogleAuth}>{t('continueWithGoogle')}</Button>
        </Flex>
      </Flex>
    </Card>
  );
}
