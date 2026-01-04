import { screen } from '@testing-library/react';
import { render, waitFor } from './test-utils/test-utils';
import { describe, test, beforeEach, vi, expect } from 'vitest';
import SignUpPage from '@/app/[locale]/(auth)/sign-up/page';

vi.mock('@/widgets', () => ({
  AuthWidget: () => <div data-testid="auth-widget">AuthWidget</div>,
}));

describe('SignUpPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the authentication widget', async () => {
    render(<SignUpPage />);

    await waitFor(() => {
      expect(screen.getByTestId('auth-widget')).toBeInTheDocument();
    });
  });

  test('renders accessible main content area', async () => {
    render(<SignUpPage />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  test('displays authentication widget to the user', async () => {
    render(<SignUpPage />);

    await waitFor(() => {
      const authWidget = screen.getByTestId('auth-widget');
      expect(authWidget).toBeVisible();
    });
  });
});
