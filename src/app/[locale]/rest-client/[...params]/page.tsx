import { lazy, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { LoadingSpinner } from '@/shared/UI';

const RestClientClient = lazy(() => import('./rest-client-client'));

export default function RestClientPageDefault() {
  const t = useTranslations('RestClient');

  return (
    <Suspense fallback={<LoadingSpinner tip={t('loading')} />}>
      <RestClientClient />
    </Suspense>
  );
}
