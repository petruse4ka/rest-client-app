import { screen } from '@testing-library/react';
import { render, waitFor } from './test-utils/test-utils';
import { describe, test, beforeEach, vi, expect } from 'vitest';
import ForgotPasswordPage from '@/app/[locale]/(auth)/forgot-password/page';

vi.mock('@/shared/i18n/navigation', () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
    }),
  };
});

vi.mock('@/widgets', () => ({
  AuthWidget: () => <div data-testid="auth-widget">AuthWidget</div>,
}));

describe('ForgotPasswordPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the authentication widget', async () => {
    render(<ForgotPasswordPage />);

    await waitFor(() => {
      expect(screen.getByTestId('auth-widget')).toBeInTheDocument();
    });
  });

  test('renders accessible main content area', async () => {
    render(<ForgotPasswordPage />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  test('displays authentication widget to the user', async () => {
    render(<ForgotPasswordPage />);

    await waitFor(() => {
      const authWidget = screen.getByTestId('auth-widget');
      expect(authWidget).toBeVisible();
    });
  });
});
