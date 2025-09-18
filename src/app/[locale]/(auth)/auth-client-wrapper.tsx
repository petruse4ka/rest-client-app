'use client';

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/shared/UI';

const AuthWidget = lazy(() =>
  import('@/widgets').then((module) => ({ default: module.AuthWidget }))
);

type AuthClientWrapperProps = {
  loadingText: string;
};

export default function AuthClientWrapper({ loadingText }: AuthClientWrapperProps) {
  return (
    <Suspense fallback={<LoadingSpinner tip={loadingText} />}>
      <AuthWidget />
    </Suspense>
  );
}
