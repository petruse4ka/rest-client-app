import { screen, fireEvent, waitFor } from '@testing-library/react';
import type { PropsWithChildren, AnchorHTMLAttributes } from 'react';
import type { UserCredential } from 'firebase/auth';

import { describe, test, beforeEach, vi, expect } from 'vitest';
import enMessages from '@/shared/i18n/messages/en.json';

vi.mock('@ant-design/v5-patch-for-react-19', () => ({}));

const replace = vi.fn();
const refresh = vi.fn();
const push = vi.fn();

vi.mock('@/shared/i18n/navigation', () => ({
  useRouter: () => ({ replace, refresh, push }),
  Link: ({
    href,
    children,
    ...rest
  }: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock('@/shared/config/navigation', () => ({
  appRoutes: { home: '/' },
}));

vi.mock('@/shared/config/navigation', () => ({
  appRoutes: { home: '/', forgotPassword: '/forgot-password' },
}));

vi.mock('@/shared/api/firebase/auth', () => ({
  apiSignIn: vi.fn(),
}));
vi.mock('@/shared/lib/auth/finalize-login', () => ({
  finalizeLogin: vi.fn(),
}));
vi.mock('@/shared/api/firebase/map-sign-in-errors', () => ({
  mapSignInError: vi.fn(),
}));

import { apiSignIn } from '@/shared/api/firebase/auth';
import { finalizeLogin } from '@/shared/lib/auth/finalize-login';
import { mapSignInError } from '@/shared/api/firebase/map-sign-in-errors';
const mockedApiSignIn = vi.mocked(apiSignIn);
const mockedFinalizeLogin = vi.mocked(finalizeLogin);
const mockedMapSignInError = vi.mocked(mapSignInError);

import { SignInForm } from '@/features/auth/sign-in/ui/sign-in-form';
import { render } from '@/__tests__/test-utils/test-utils';

describe('SignInForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders labels/placeholders and disabled submit initially', () => {
    render(<SignInForm />);

    expect(screen.getByText(enMessages.SignInForm.email.label)).toBeInTheDocument();
    expect(screen.getByText(enMessages.SignInForm.password.label)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(enMessages.SignInForm.email.placeholder)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(enMessages.SignInForm.password.placeholder)
    ).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: enMessages.SignInForm.submit });
    expect(submitBtn).toBeDisabled();
  });

  test('enables submit after valid input', async () => {
    render(<SignInForm />);

    const email = screen.getByPlaceholderText(enMessages.SignInForm.email.placeholder);
    const pass = screen.getByPlaceholderText(enMessages.SignInForm.password.placeholder);

    fireEvent.change(email, { target: { value: 'user@example.com' } });
    fireEvent.blur(email);
    fireEvent.change(pass, { target: { value: 'Secret123!' } });
    fireEvent.blur(pass);

    const submitBtn = screen.getByRole('button', { name: enMessages.SignInForm.submit });

    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });
  });

  test('successful submit calls apiSignIn + finalizeLogin and redirects', async () => {
    const fakeCred = { user: { uid: 'u1' } } as unknown as UserCredential;
    mockedApiSignIn.mockResolvedValueOnce(fakeCred);
    mockedFinalizeLogin.mockResolvedValueOnce(undefined);

    render(<SignInForm />);

    const email = screen.getByPlaceholderText(enMessages.SignInForm.email.placeholder);
    const pass = screen.getByPlaceholderText(enMessages.SignInForm.password.placeholder);

    fireEvent.change(email, { target: { value: 'user@example.com' } });
    fireEvent.blur(email);
    fireEvent.change(pass, { target: { value: 'Secret123!' } });
    fireEvent.blur(pass);

    fireEvent.click(screen.getByRole('button', { name: enMessages.SignInForm.submit }));

    await waitFor(() => {
      expect(mockedApiSignIn).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'Secret123!',
      });
      expect(mockedFinalizeLogin).toHaveBeenCalledTimes(1);
      expect(replace).toHaveBeenCalledWith('/', { scroll: false });
      expect(refresh).toHaveBeenCalledTimes(1);
    });
  });

  test('maps field error to email input', async () => {
    mockedApiSignIn.mockRejectedValueOnce(new Error('bad'));
    mockedMapSignInError.mockReturnValueOnce({
      field: 'email',
      key: 'invalidCredential',
    } as ReturnType<typeof mapSignInError>);

    render(<SignInForm />);

    const email = screen.getByPlaceholderText(enMessages.SignInForm.email.placeholder);
    const pass = screen.getByPlaceholderText(enMessages.SignInForm.password.placeholder);

    fireEvent.change(email, { target: { value: 'user@example.com' } });
    fireEvent.blur(email);
    fireEvent.change(pass, { target: { value: 'Secret123!' } });
    fireEvent.blur(pass);

    fireEvent.click(screen.getByRole('button', { name: enMessages.SignInForm.submit }));

    await waitFor(() => {
      expect(
        screen.getByText(enMessages.SignInForm.apiErrors.invalidCredential)
      ).toBeInTheDocument();
    });
  });
});
