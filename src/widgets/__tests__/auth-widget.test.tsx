import { screen } from '@testing-library/react';
import { render } from '@/__tests__/test-utils/test-utils';

import { describe, test, beforeEach, vi, expect } from 'vitest';
import enMessages from '@/shared/i18n/messages/en.json';

vi.mock('@ant-design/v5-patch-for-react-19', () => ({}));

let __pathname = '/sign-in';
const replace = vi.fn();
const refresh = vi.fn();
const push = vi.fn();

vi.mock('@/shared/i18n/navigation', () => ({
  Link: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
  usePathname: () => __pathname,
  useRouter: () => ({ replace, refresh, push }),
}));

vi.mock('@/shared/config/navigation', () => ({
  appRoutes: { home: '/', signIn: '/sign-in', signUp: '/sign-up' },
}));

vi.mock('@/shared/api/firebase/auth', () => ({ apiSignUpWithGooglePopup: vi.fn() }));
vi.mock('@/shared/lib/auth/finalize-login', () => ({ finalizeLogin: vi.fn() }));
vi.mock('@/shared/api/firebase/map-google-error', () => ({ mapGoogleAuthError: vi.fn() }));

vi.mock('@/features/auth/', () => ({
  SignInForm: () => <div data-testid="sign-in-form">SignInForm</div>,
  SignUpForm: () => <div data-testid="sign-up-form">SignUpForm</div>,
}));

import { AuthWidget } from '@/widgets/auth-widget/auth-widget';
import { ReactNode } from 'react';

describe('AuthWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    __pathname = '/sign-in';
  });

  test('renders login state on /sign-in', () => {
    render(<AuthWidget />);

    expect(screen.getByRole('heading', { name: enMessages.Auth.titles.login })).toBeInTheDocument();
    expect(screen.getByTestId('sign-in-form')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: enMessages.Auth.tabs.login })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: enMessages.Auth.tabs.signup })).toBeInTheDocument();

    expect(screen.getByTestId('auth-cta')).toHaveTextContent(enMessages.Auth.cta.noAccount);
    expect(screen.getByTestId('auth-cta')).toHaveTextContent(enMessages.Auth.cta.signUpSuffix);

    expect(screen.getByText(enMessages.Auth.or)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: enMessages.Auth.continueWithGoogle })
    ).toBeInTheDocument();
  });

  test('renders signup state on /sign-up', () => {
    __pathname = '/sign-up';
    render(<AuthWidget />);

    expect(
      screen.getByRole('heading', { name: enMessages.Auth.titles.signup })
    ).toBeInTheDocument();
    expect(screen.getByTestId('sign-up-form')).toBeInTheDocument();

    expect(screen.getByTestId('auth-cta')).toHaveTextContent(enMessages.Auth.cta.haveAccount);
    expect(screen.getByTestId('auth-cta')).toHaveTextContent(enMessages.Auth.cta.loginSuffix);
  });
});
