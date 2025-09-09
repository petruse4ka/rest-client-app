'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/shared/i18n/navigation';
import { apiSignUpWithGooglePopup } from '@/shared/api/firebase/auth';
import { mapGoogleAuthError } from '@/shared/api/firebase/map-google-error';

import { SignUpForm, SignInForm } from '@/features/auth/';
import { Button, Card, Divider, Flex, Radio, Typography } from 'antd';
import { Group } from 'antd/es/radio';

import { cardStyles, flexWrapperStyles } from './auth-widget.styles';

const { Title, Text } = Typography;

export function AuthWidget() {
  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations('Auth');

  const loginActive = pathname?.includes('/sign-in');

  const value = pathname.includes('/sign-in') ? 'login' : 'signup';

  const [apiError, setApiError] = useState<string | null>(null);

  const handleGoogleAuth = async () => {
    try {
      setApiError(null);
      await apiSignUpWithGooglePopup();
      router.push('/');
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
              if (e.target.value === 'login') router.push('/sign-in');
              else router.push('/sign-up');
            }}
          >
            <Radio.Button value="login">{t('tabs.login')}</Radio.Button>
            <Radio.Button value="signup">{t('tabs.signup')}</Radio.Button>
          </Group>
        </Flex>

        <Title level={3}>{t(loginActive ? 'titles.login' : 'titles.signup')}</Title>

        {loginActive ? <SignInForm /> : <SignUpForm />}

        <Flex justify="center">
          <Text type="secondary">
            {t(loginActive ? 'cta.noAccount' : 'cta.haveAccount')} {t('cta.click')}{' '}
            <Link href={loginActive ? '/sign-up' : '/sign-in'}>{t('cta.here')}</Link>{' '}
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
          <Button size="large" onClick={handleGoogleAuth}>
            {t('continueWithGoogle')}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
