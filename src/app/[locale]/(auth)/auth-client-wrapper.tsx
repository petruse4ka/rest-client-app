'use client';

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/shared/UI';
import { useTranslations } from 'next-intl';

const AuthWidget = lazy(() =>
  import('@/widgets').then((module) => ({ default: module.AuthWidget }))
);

export default function AuthClientWrapper() {
  const t = useTranslations('Auth');
  const loadingText = t('loading');

  return (
    <Suspense fallback={<LoadingSpinner tip={loadingText} />}>
      <AuthWidget />
    </Suspense>
  );
}
