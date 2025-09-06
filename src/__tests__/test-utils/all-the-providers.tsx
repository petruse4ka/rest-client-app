import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '@/shared/i18n/messages/en.json';

export default function AllTheProviders({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider messages={enMessages} locale="en">
      {children}
    </NextIntlClientProvider>
  );
}
