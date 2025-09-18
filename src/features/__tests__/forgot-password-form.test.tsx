import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, beforeEach, vi, expect } from 'vitest';
import enMessages from '@/shared/i18n/messages/en.json';

vi.mock('@ant-design/v5-patch-for-react-19', () => ({}));

vi.mock('@/shared/i18n/navigation', () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
    }),
  };
});

vi.mock('@/shared/api/firebase/auth', () => ({
  apiResetPassword: vi.fn(),
}));

vi.mock('@/shared/api/firebase/map-reset-password-errors', () => ({
  mapResetPasswordError: vi.fn(),
}));

import { render } from '@/__tests__/test-utils/test-utils';
import { ForgotPasswordForm } from '@/features/auth/forgot-password/ui/forgot-password-form';
import { apiResetPassword } from '@/shared/api/firebase/auth';
import { mapResetPasswordError } from '@/shared/api/firebase/map-reset-password-errors';

const mockedApiReset = vi.mocked(apiResetPassword);
const mockedMapResetErr = vi.mocked(mapResetPasswordError);

describe('ForgotPasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders label/placeholder and disabled submit initially', () => {
    render(<ForgotPasswordForm />);

    expect(screen.getByText(enMessages.ForgotPasswordForm.email.label)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(enMessages.ForgotPasswordForm.email.placeholder)
    ).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', {
      name: enMessages.ForgotPasswordForm.submit,
    });
    expect(submitBtn).toBeDisabled();
  });

  test('enables submit after valid email input', async () => {
    render(<ForgotPasswordForm />);

    const email = screen.getByPlaceholderText(enMessages.ForgotPasswordForm.email.placeholder);

    fireEvent.change(email, { target: { value: 'user@example.com' } });
    fireEvent.blur(email);

    const submitBtn = screen.getByRole('button', {
      name: enMessages.ForgotPasswordForm.submit,
    });

    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });
  });

  test('successful submit calls apiResetPassword and shows success message', async () => {
    mockedApiReset.mockResolvedValueOnce(undefined);

    render(<ForgotPasswordForm />);

    const email = screen.getByPlaceholderText(enMessages.ForgotPasswordForm.email.placeholder);

    fireEvent.change(email, { target: { value: 'user@example.com' } });
    fireEvent.blur(email);

    fireEvent.click(screen.getByRole('button', { name: enMessages.ForgotPasswordForm.submit }));

    await waitFor(() => {
      expect(mockedApiReset).toHaveBeenCalledWith('user@example.com');
      expect(screen.getByText(enMessages.ForgotPasswordForm.messages.linkSent)).toBeInTheDocument();
    });
  });

  test('shows top-level api error when not tied to a specific field', async () => {
    mockedApiReset.mockRejectedValueOnce(new Error('too many'));
    mockedMapResetErr.mockReturnValueOnce({
      field: undefined,
      key: 'tooManyRequests',
    } as ReturnType<typeof mapResetPasswordError>);

    render(<ForgotPasswordForm />);

    const email = screen.getByPlaceholderText(enMessages.ForgotPasswordForm.email.placeholder);
    fireEvent.change(email, { target: { value: 'user@example.com' } });
    fireEvent.blur(email);

    fireEvent.click(screen.getByRole('button', { name: enMessages.ForgotPasswordForm.submit }));

    await waitFor(() => {
      expect(
        screen.getByText(enMessages.ForgotPasswordForm.apiErrors.tooManyRequests)
      ).toBeInTheDocument();
    });
  });
});
