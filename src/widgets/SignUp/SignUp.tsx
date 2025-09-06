'use client';

import { Button, Card, Divider, Flex, Form, Input, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { Link } from '@/shared/i18n/navigation';
import { SignUpForm } from '@/features/auth/sign-up';

export function SignUpWidget() {
  const t = useTranslations('SignUpForm');
  return (
    <Card
      style={{
        maxWidth: 520,
        width: '100%',
        marginInline: 'auto',
        borderRadius: 16,
        background: '#f5f5f5',
        boxShadow: '0 8px 24px rgba(0,0,0,.08)',
      }}
    >
      <Flex vertical style={{ maxWidth: 480, width: '100%', marginInline: 'auto' }}>
        <Flex justify="flex-end" style={{ marginBottom: 8 }}>
          <div>
            <Link href="/">{t('tabs.login')}</Link>
            <Link href="/">{t('tabs.signup')}</Link>
          </div>
        </Flex>

        <Typography.Title>{t('title')}</Typography.Title>
        <SignUpForm />
        <div className="mt-4 text-center">
          <Typography.Text type="secondary">
            {t('haveAccount')}{' '}
            <Link href="../sign-in" className="underline">
              {t('loginLink')}
            </Link>
          </Typography.Text>
        </div>

        <Divider plain>{t('or')}</Divider>

        <div className="flex justify-center">
          <Button size="large">{t('continueWithGoogle')}</Button>
        </div>
      </Flex>
    </Card>
  );
}
