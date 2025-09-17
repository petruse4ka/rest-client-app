import { screen } from '@testing-library/react';
import { render } from './test-utils/test-utils';
import { describe, test, beforeEach, vi, expect } from 'vitest';
import SignUpPage from '@/app/[locale]/(auth)/sign-up/page';

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

describe('SignUpPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders AuthWidget inside centered Content', () => {
    render(<SignUpPage />);

    expect(screen.getByTestId('auth-widget')).toBeInTheDocument();

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    expect(main).toHaveStyle('display: flex');
    expect(main).toHaveStyle('align-items: center');
    expect(main).toHaveStyle('justify-content: center');
    expect(main).toHaveStyle('padding: 40px 20px');
    expect(main).toHaveStyle('height: 100%');
  });
});
