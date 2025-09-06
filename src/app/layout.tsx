import type { Metadata } from 'next';
import { type ReactNode } from 'react';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { getMessages } from 'next-intl/server';
import { FooterApp, HeaderApp } from '@/widgets';
import { Layout } from 'antd';
import { ThemeProvider } from '@/shared/provider';

export const metadata: Metadata = {
  title: 'REST Client App - Professional API Testing Tool',
  description:
    'A powerful REST client application for testing APIs with support for multiple HTTP methods, request/response handling, variables, history tracking, and internationalization. Built with Next.js and modern web technologies.',
  keywords: [
    'REST client',
    'API testing',
    'HTTP client',
    'API development',
    'Postman alternative',
    'API debugging',
    'HTTP methods',
    'Request/response',
    'API documentation',
  ],
  authors: [
    { name: 'Nataliia Shmatenko', url: 'https://github.com/natashasolntseva' },
    { name: 'Daniil Biver', url: 'https://github.com/tearzday' },
    { name: 'Konstantin Petrov', url: 'https://github.com/petruse4ka' },
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'REST Client App - Professional API Testing Tool',
    description:
      'Test APIs with ease using our powerful REST client. Support for all HTTP methods, variables, history tracking, and multiple languages.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REST Client App - Professional API Testing Tool',
    description:
      'Test APIs with ease using our powerful REST client. Support for all HTTP methods, variables, history tracking, and multiple languages.',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Layout>
              <HeaderApp />
              {children}
              <FooterApp />
            </Layout>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
