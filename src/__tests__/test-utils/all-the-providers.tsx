import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/shared/provider';
import enMessages from '@/shared/i18n/messages/en.json';

export default function AllTheProviders({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider messages={enMessages} locale="en">
      <ThemeProvider>{children}</ThemeProvider>
    </NextIntlClientProvider>
  );
}
