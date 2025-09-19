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

  test('renders AuthWidget inside centered Content', async () => {
    render(<ForgotPasswordPage />);

    await waitFor(() => {
      expect(screen.getByTestId('auth-widget')).toBeInTheDocument();
    });

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    expect(main).toHaveStyle('display: flex');
    expect(main).toHaveStyle('align-items: center');
    expect(main).toHaveStyle('justify-content: center');
    expect(main).toHaveStyle('padding: 40px 20px');
    expect(main).toHaveStyle('height: 100%');
  });
});
