import { screen } from '@testing-library/react';
import { render, waitFor } from './test-utils/test-utils';
import { describe, test, beforeEach, vi, expect } from 'vitest';
import SignInPage from '@/app/[locale]/(auth)/sign-in/page';

vi.mock('@/widgets', () => ({
  AuthWidget: () => <div data-testid="auth-widget">AuthWidget</div>,
}));

describe('SignInPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the authentication widget', async () => {
    render(<SignInPage />);

    await waitFor(() => {
      expect(screen.getByTestId('auth-widget')).toBeInTheDocument();
    });
  });

  test('renders accessible main content area', async () => {
    render(<SignInPage />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  test('displays authentication widget to the user', async () => {
    render(<SignInPage />);

    await waitFor(() => {
      const authWidget = screen.getByTestId('auth-widget');
      expect(authWidget).toBeVisible();
    });
  });
});
