import React from 'react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '@/__tests__/test-utils/test-utils';

const mockUseAuth = vi.fn(() => ({ isLogin: false }));
const mockPush = vi.fn();
const mockRefresh = vi.fn();

vi.mock('@/shared/provider/auth-provider', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => mockUseAuth(),
}));

vi.mock('@/shared/i18n/navigation', () => ({
  usePathname: vi.fn(() => '/some/path'),
  useRouter: vi.fn(() => ({ push: mockPush, refresh: mockRefresh })),
  useLocale: vi.fn(() => 'en'),
}));

vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  const mockUseBreakpoint = vi.fn(() => ({ md: true }));
  return {
    ...actual,
    Grid: {
      useBreakpoint: mockUseBreakpoint,
    },
  };
});

import DesktopHeader from '../header/desktop-header';

describe('Header Desktop', () => {
  beforeEach(() => {
    mockUseAuth.mockReset();
    mockUseAuth.mockReturnValue({ isLogin: false });
  });

  test('Render without login', () => {
    render(<DesktopHeader />);

    expect(screen.getByTestId('desktop-header')).toBeInTheDocument();
    expect(screen.queryByTestId('navigation')).not.toBeInTheDocument();
  });

  test('Render with login', () => {
    mockUseAuth.mockReturnValue({ isLogin: true });

    render(<DesktopHeader />);

    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  test('Auth Controls for Login', () => {
    mockUseAuth.mockReturnValue({ isLogin: true });

    render(<DesktopHeader />);
    expect(screen.getByTestId('sign-out-btn')).toBeInTheDocument();
  });

  test('Auth Controls for Logout', () => {
    mockUseAuth.mockReturnValue({ isLogin: false });

    render(<DesktopHeader />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('Auth Controls Logout', async () => {
    mockUseAuth.mockReturnValue({ isLogin: true });

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
      } as Response)
    ) as unknown as typeof fetch;

    render(<DesktopHeader />);
    const btn = screen.getByTestId('sign-out-btn');

    fireEvent.click(btn);
    fireEvent.click(await screen.findByText('Yes'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/logout', { method: 'POST' });
      expect(mockPush).toHaveBeenCalledWith('/');
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  test('Auth Controls Navigation', async () => {
    mockUseAuth.mockReturnValue({ isLogin: false });

    render(<DesktopHeader />);

    const signInButton = screen.getByText('Sign In');
    const signUpButton = screen.getByText('Sign Up');

    fireEvent.click(signInButton);
    expect(mockPush).toHaveBeenCalledWith('/sign-in');

    fireEvent.click(signUpButton);
    expect(mockPush).toHaveBeenCalledWith('/sign-up');
  });

  test('Render Interface Settings', () => {
    render(<DesktopHeader />);
    expect(screen.getByTestId('interface-settings')).toBeInTheDocument();
  });
});
