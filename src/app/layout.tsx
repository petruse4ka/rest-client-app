'use client';

// import type { Metadata } from 'next';
import { useEffect, useState, type ReactNode } from 'react';
import './globals.css';
import { ConfigProvider, Layout } from 'antd';
import { ThemeValue } from '@/types/types';
import getDefaultTheme from '@/shared/utils/get-default-theme';
import { darkTheme, lightTheme } from '@/shared/config/theme';
import { ThemeContext } from '@/context/theme-context';
import { HeaderApp } from '@/widgets';
import { Footer } from 'antd/es/layout/layout';

// export const metadata: Metadata = {
//   title: 'REST Client App - Professional API Testing Tool',
//   description:
//     'A powerful REST client application for testing APIs with support for multiple HTTP methods, request/response handling, variables, history tracking, and internationalization. Built with Next.js and modern web technologies.',
//   keywords: [
//     'REST client',
//     'API testing',
//     'HTTP client',
//     'API development',
//     'Postman alternative',
//     'API debugging',
//     'HTTP methods',
//     'Request/response',
//     'API documentation',
//   ],
//   authors: [
//     { name: 'Nataliia Shmatenko', url: 'https://github.com/natashasolntseva' },
//     { name: 'Daniil Biver', url: 'https://github.com/tearzday' },
//     { name: 'Konstantin Petrov', url: 'https://github.com/petruse4ka' },
//   ],
//   robots: 'index, follow',
//   openGraph: {
//     title: 'REST Client App - Professional API Testing Tool',
//     description:
//       'Test APIs with ease using our powerful REST client. Support for all HTTP methods, variables, history tracking, and multiple languages.',
//     type: 'website',
//     locale: 'en_US',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'REST Client App - Professional API Testing Tool',
//     description:
//       'Test APIs with ease using our powerful REST client. Support for all HTTP methods, variables, history tracking, and multiple languages.',
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [themeValue, setThemeValue] = useState<ThemeValue>('light');

  useEffect(() => {
    setThemeValue(getDefaultTheme());
  }, []);

  return (
    <html lang="en">
      <body>
        <ThemeContext value={{ themeValue, setThemeValue }}>
          <ConfigProvider theme={themeValue === 'dark' ? darkTheme : lightTheme}>
            <Layout>
              <HeaderApp />
              {children}
              <Footer>Footer</Footer>
            </Layout>
          </ConfigProvider>
        </ThemeContext>
      </body>
    </html>
  );
}
