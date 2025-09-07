'use client';

import { type CSSProperties, useContext } from 'react';
import { useTranslations } from 'next-intl';
import { ThemeContext } from '@/context/theme-context';
import { Link, usePathname } from '@/shared/i18n/navigation';
import { apiSignUpWithGooglePopup } from '@/shared/api/firebase/auth';

import { SignUpForm, SignInForm } from '@/features/auth/';
import { Button, Card, Divider, Flex, Typography } from 'antd';

import { orangeColors, zincColors } from '@/shared/style';

const { Title, Text } = Typography;

export function AuthWidget() {
  const pathname = usePathname();

  const t = useTranslations('Auth');

  const { themeValue } = useContext(ThemeContext);

  const TitleStyle: CSSProperties = {
    color: themeValue === 'dark' ? orangeColors[500] : zincColors[900],
  };

  const loginActive = pathname?.includes('/sign-in');
  const signupActive = pathname?.includes('/sign-up');

  const tabBase: CSSProperties = {
    border: '1px solid',
    padding: '2px 12px',
    cursor: 'pointer',
  };

  const tabLogin: CSSProperties = {
    ...tabBase,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  };

  const tabSignup: CSSProperties = {
    ...tabBase,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };

  return (
    <Card
      style={{
        maxWidth: 520,
        width: '100%',
        marginInline: 'auto',
        borderRadius: 16,
        boxShadow: '0 8px 24px rgba(0,0,0,.08)',
      }}
    >
      <Flex vertical style={{ maxWidth: 480, width: '100%', marginInline: 'auto' }}>
        <Flex justify="flex-end" style={{ marginBottom: 12 }}>
          <Flex
            style={{
              ...tabLogin,
              borderColor: loginActive ? orangeColors[500] : zincColors[300],
              backgroundColor: loginActive ? orangeColors[500] : 'transparent',
            }}
          >
            <Text type="secondary">
              <Link href="/sign-in">{t('tabs.login')}</Link>
            </Text>
          </Flex>
          <Flex
            style={{
              ...tabSignup,
              borderColor: signupActive ? orangeColors[500] : zincColors[300],
              backgroundColor: signupActive ? orangeColors[500] : 'transparent',
            }}
          >
            <Text type="secondary">
              <Link href="/sign-up">{t('tabs.signup')}</Link>
            </Text>
          </Flex>
        </Flex>

        <Title level={3} style={{ ...TitleStyle }}>
          {t(loginActive ? 'titles.login' : 'titles.signup')}
        </Title>

        {signupActive ? <SignUpForm /> : <SignInForm />}

        <div className="mt-4 text-center">
          <Text type="secondary">
            {t(loginActive ? 'cta.noAccount' : 'cta.haveAccount')}{' '}
            <Link href={loginActive ? '/sign-up' : '/sign-in'} className="underline">
              {t(loginActive ? 'cta.signUpLink' : 'cta.loginLink')}
            </Link>
          </Text>
        </div>

        <Divider plain>{t('or')}</Divider>

        <div className="flex justify-center">
          <Button size="large" onClick={() => apiSignUpWithGooglePopup()}>
            {t('continueWithGoogle')}
          </Button>
        </div>
      </Flex>
    </Card>
  );
}
