import type { Metadata } from 'next';
import { type ReactNode } from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { FooterApp, HeaderApp } from '@/widgets';
import { Layout } from 'antd';
import { ThemeProvider, AuthProvider } from '@/shared/provider';
import { routing } from '@/shared/i18n/routing';
import { notFound } from 'next/navigation';
import { getServerUser } from '@/server/get-server-user';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';

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

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const userServer = await getServerUser();
  const initialUser = userServer ? { name: userServer.name } : null;

  return (
    <html lang={locale}>
      <body>
        <AntdRegistry>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>
              <AuthProvider initialUser={initialUser}>
                <Layout style={{ minHeight: '100vh' }}>
                  <HeaderApp />
                  {children}
                  <FooterApp />
                </Layout>
              </AuthProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
