import { screen, fireEvent, waitFor } from '@testing-library/react';

import { describe, test, beforeEach, vi, expect } from 'vitest';
import enMessages from '@/shared/i18n/messages/en.json';
import type { UserCredential } from 'firebase/auth';

vi.mock('@ant-design/v5-patch-for-react-19', () => ({}));

const replace = vi.fn();
const refresh = vi.fn();
vi.mock('@/shared/i18n/navigation', () => ({ useRouter: () => ({ replace, refresh }) }));
vi.mock('@/shared/config/navigation', () => ({ appRoutes: { home: '/' } }));

vi.mock('@/shared/api/firebase/auth', () => ({ apiSignUp: vi.fn() }));
vi.mock('firebase/auth', () => ({ updateProfile: vi.fn() }));
vi.mock('@/shared/lib/auth/finalize-login', () => ({ finalizeLogin: vi.fn() }));
vi.mock('@/shared/api/firebase/map-sign-up-error', () => ({ mapSignUpError: vi.fn() }));

import { apiSignUp } from '@/shared/api/firebase/auth';
import { updateProfile } from 'firebase/auth';
import { finalizeLogin } from '@/shared/lib/auth/finalize-login';
import { mapSignUpError } from '@/shared/api/firebase/map-sign-up-error';
const mockedApiSignUp = vi.mocked(apiSignUp);
const mockedUpdateProfile = vi.mocked(updateProfile);
const mockedFinalizeLogin = vi.mocked(finalizeLogin);
const mockedMapSignUpError = vi.mocked(mapSignUpError);

import { SignUpForm } from '@/features/auth/sign-up/ui/sign-up-form';
import { render } from '@/__tests__/test-utils/test-utils';

describe('SignUpForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders labels/placeholders and submit disabled initially', () => {
    render(<SignUpForm />);

    expect(screen.getByText(enMessages.SignUpForm.name.label)).toBeInTheDocument();
    expect(screen.getByText(enMessages.SignUpForm.email.label)).toBeInTheDocument();
    expect(screen.getByText(enMessages.SignUpForm.password.label)).toBeInTheDocument();
    expect(screen.getByText(enMessages.SignUpForm.confirm.label)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(enMessages.SignUpForm.name.placeholder)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(enMessages.SignUpForm.email.placeholder)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(enMessages.SignUpForm.password.placeholder)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(enMessages.SignUpForm.confirm.placeholder)
    ).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: enMessages.SignUpForm.submit });
    expect(submitBtn).toBeDisabled();
  });

  test('confirm validator blocks submit when passwords mismatch and shows error; then passes when fixed', async () => {
    const { container } = render(<SignUpForm />);

    const name = screen.getByPlaceholderText(enMessages.SignUpForm.name.placeholder);
    const email = screen.getByPlaceholderText(enMessages.SignUpForm.email.placeholder);
    const pass = screen.getByPlaceholderText(enMessages.SignUpForm.password.placeholder);
    const confirm = screen.getByPlaceholderText(enMessages.SignUpForm.confirm.placeholder);

    fireEvent.change(name, { target: { value: 'UserName' } });
    fireEvent.blur(name);
    fireEvent.change(email, { target: { value: 'user@example.com' } });
    fireEvent.blur(email);
    fireEvent.change(pass, { target: { value: 'Secret123!' } });
    fireEvent.blur(pass);
    fireEvent.change(confirm, { target: { value: 'Wrong123!' } });
    fireEvent.blur(confirm);

    await waitFor(() => {
      expect(screen.getByText(enMessages.SignUpForm.errors.passwordsDontMatch)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: enMessages.SignUpForm.submit })).toBeDisabled();

    fireEvent.change(confirm, { target: { value: 'Secret123!' } });
    fireEvent.blur(confirm);

    await waitFor(() => {
      expect(
        screen.queryByText(enMessages.SignUpForm.errors.passwordsDontMatch)
      ).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: enMessages.SignUpForm.submit })).not.toBeDisabled();
    });

    const globalError = container.querySelector('.ant-typography-danger') as HTMLElement;
    expect(globalError).toBeInTheDocument();
    expect(globalError).toHaveTextContent(/^\s*$/);
  });

  test('successful submit calls apiSignUp, updateProfile, finalizeLogin and redirects; fields reset', async () => {
    const fakeCred = { user: { uid: 'u1' } } as unknown as UserCredential;
    mockedApiSignUp.mockResolvedValueOnce(fakeCred);
    mockedUpdateProfile.mockResolvedValueOnce(void 0);
    mockedFinalizeLogin.mockResolvedValueOnce(void 0);

    render(<SignUpForm />);

    const name = screen.getByPlaceholderText(enMessages.SignUpForm.name.placeholder);
    const email = screen.getByPlaceholderText(enMessages.SignUpForm.email.placeholder);
    const pass = screen.getByPlaceholderText(enMessages.SignUpForm.password.placeholder);
    const confirm = screen.getByPlaceholderText(enMessages.SignUpForm.confirm.placeholder);

    fireEvent.change(name, { target: { value: 'UserName' } });
    fireEvent.blur(name);
    fireEvent.change(email, { target: { value: 'user@example.com' } });
    fireEvent.blur(email);
    fireEvent.change(pass, { target: { value: 'Secret123!' } });
    fireEvent.blur(pass);
    fireEvent.change(confirm, { target: { value: 'Secret123!' } });
    fireEvent.blur(confirm);

    fireEvent.click(screen.getByRole('button', { name: enMessages.SignUpForm.submit }));

    await waitFor(() => {
      expect(mockedApiSignUp).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'Secret123!',
      });
      expect(mockedUpdateProfile).toHaveBeenCalledWith(fakeCred.user, { displayName: 'UserName' });
      expect(mockedFinalizeLogin).toHaveBeenCalledTimes(1);
      expect(replace).toHaveBeenCalledWith('/');
      expect(refresh).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText(
        enMessages.SignUpForm.name.placeholder
      ) as HTMLInputElement;
      const emailInput = screen.getByPlaceholderText(
        enMessages.SignUpForm.email.placeholder
      ) as HTMLInputElement;
      const passInput = screen.getByPlaceholderText(
        enMessages.SignUpForm.password.placeholder
      ) as HTMLInputElement;
      const confirmInput = screen.getByPlaceholderText(
        enMessages.SignUpForm.confirm.placeholder
      ) as HTMLInputElement;

      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(passInput).toHaveValue('');
      expect(confirmInput).toHaveValue('');
    });
  });

  test('maps field error (email) from API to form item error', async () => {
    mockedApiSignUp.mockRejectedValueOnce(new Error('email in use'));
    mockedMapSignUpError.mockReturnValueOnce({
      field: 'email',
      key: 'emailInUse',
    });

    render(<SignUpForm />);

    const name = screen.getByPlaceholderText(enMessages.SignUpForm.name.placeholder);
    const email = screen.getByPlaceholderText(enMessages.SignUpForm.email.placeholder);
    const pass = screen.getByPlaceholderText(enMessages.SignUpForm.password.placeholder);
    const confirm = screen.getByPlaceholderText(enMessages.SignUpForm.confirm.placeholder);

    fireEvent.change(name, { target: { value: 'UserName' } });
    fireEvent.blur(name);
    fireEvent.change(email, { target: { value: 'user@example.com' } });
    fireEvent.blur(email);
    fireEvent.change(pass, { target: { value: 'Secret123!' } });
    fireEvent.blur(pass);
    fireEvent.change(confirm, { target: { value: 'Secret123!' } });
    fireEvent.blur(confirm);

    fireEvent.click(screen.getByRole('button', { name: enMessages.SignUpForm.submit }));

    await waitFor(() => {
      expect(screen.getByText(enMessages.SignUpForm.apiErrors.emailInUse)).toBeInTheDocument();
    });
  });

  test('shows global api error when field not specified', async () => {
    mockedApiSignUp.mockRejectedValueOnce(new Error('down'));
    mockedMapSignUpError.mockReturnValueOnce({
      field: undefined,
      key: 'generic',
    });

    const { container } = render(<SignUpForm />);

    const name = screen.getByPlaceholderText(enMessages.SignUpForm.name.placeholder);
    const email = screen.getByPlaceholderText(enMessages.SignUpForm.email.placeholder);
    const pass = screen.getByPlaceholderText(enMessages.SignUpForm.password.placeholder);
    const confirm = screen.getByPlaceholderText(enMessages.SignUpForm.confirm.placeholder);

    fireEvent.change(name, { target: { value: 'UserName' } });
    fireEvent.blur(name);
    fireEvent.change(email, { target: { value: 'user@example.com' } });
    fireEvent.blur(email);
    fireEvent.change(pass, { target: { value: 'Secret123!' } });
    fireEvent.blur(pass);
    fireEvent.change(confirm, { target: { value: 'Secret123!' } });
    fireEvent.blur(confirm);

    fireEvent.click(screen.getByRole('button', { name: enMessages.SignUpForm.submit }));

    await waitFor(() => {
      const globalError = container.querySelector('.ant-typography-danger') as HTMLElement;
      expect(globalError).toBeInTheDocument();
      expect(globalError).toHaveTextContent(enMessages.SignUpForm.apiErrors.generic);
    });
  });
});
