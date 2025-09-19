import { render, screen } from '@testing-library/react';
import LocaleLayout from '@/app/[locale]/layout';
import type { ReactNode } from 'react';

vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({
    children,
    messages,
  }: {
    children: ReactNode;
    messages: Record<string, unknown>;
  }) => (
    <div data-testid="next-intl-provider">
      <div data-testid="messages">{JSON.stringify(messages)}</div>
      {children}
    </div>
  ),
  hasLocale: () => true,
}));

vi.mock('next-intl/server', () => ({
  getMessages: () => Promise.resolve({ common: { title: 'Test App' } }),
}));

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('@/widgets', () => ({
  HeaderApp: () => <div data-testid="header-app">Header</div>,
  FooterApp: () => <div data-testid="footer-app">Footer</div>,
}));

vi.mock('@/shared/provider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
  AuthProvider: ({
    children,
    initialUser,
  }: {
    children: React.ReactNode;
    initialUser: { name: string } | null;
  }) => (
    <div data-testid="auth-provider">
      <div data-testid="initial-user">{JSON.stringify(initialUser)}</div>
      {children}
    </div>
  ),
}));

vi.mock('@/shared/UI', () => ({
  ClientLoader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="client-loader">{children}</div>
  ),
}));

vi.mock('@/server/get-server-user', () => ({
  getServerUser: () => Promise.resolve({ name: 'Test User' }),
}));

vi.mock('@/shared/i18n/routing', () => ({
  routing: {
    locales: ['en', 'es'],
  },
}));

vi.mock('@ant-design/nextjs-registry', () => ({
  AntdRegistry: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="antd-registry">{children}</div>
  ),
}));

vi.mock('../app/[locale]/globals.css', () => ({}));

describe('LocaleLayout', () => {
  test('renders layout with all providers', async () => {
    const mockParams = Promise.resolve({ locale: 'en' });
    const mockChildren = <div data-testid="children">Test Content</div>;

    render(await LocaleLayout({ children: mockChildren, params: mockParams }));

    expect(screen.getByTestId('antd-registry')).toBeInTheDocument();
    expect(screen.getByTestId('client-loader')).toBeInTheDocument();
    expect(screen.getByTestId('next-intl-provider')).toBeInTheDocument();
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
    expect(screen.getByTestId('header-app')).toBeInTheDocument();
    expect(screen.getByTestId('footer-app')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  test('renders with correct locale in providers', async () => {
    const mockParams = Promise.resolve({ locale: 'en' });
    const mockChildren = <div>Test Content</div>;

    render(await LocaleLayout({ children: mockChildren, params: mockParams }));

    expect(screen.getByTestId('antd-registry')).toBeInTheDocument();
    expect(screen.getByTestId('next-intl-provider')).toBeInTheDocument();
  });

  test('displays initial user data', async () => {
    const mockParams = Promise.resolve({ locale: 'en' });
    const mockChildren = <div>Test Content</div>;

    render(await LocaleLayout({ children: mockChildren, params: mockParams }));

    expect(screen.getByTestId('initial-user')).toHaveTextContent('{"name":"Test User"}');
  });
});
