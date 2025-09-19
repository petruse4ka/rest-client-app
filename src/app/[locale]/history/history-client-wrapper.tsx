'use client';

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/shared/UI';
import { RequestHistoryItem } from '@/types/types';

const HistoryView = lazy(() => import('./history-client'));

type HistoryClientWrapperProps = {
  items: RequestHistoryItem[];
  loadingText: string;
};

export default function HistoryClientWrapper({ items, loadingText }: HistoryClientWrapperProps) {
  return (
    <Suspense fallback={<LoadingSpinner tip={loadingText} />}>
      <HistoryView items={items} />
    </Suspense>
  );
}
