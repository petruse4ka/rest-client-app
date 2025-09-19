import React from 'react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '@/__tests__/test-utils/test-utils';

const mockPush = vi.fn();
const mockRefresh = vi.fn();

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
  test('Render without login', () => {
    render(<DesktopHeader user={null} />);

    expect(screen.getByTestId('desktop-header')).toBeInTheDocument();
    expect(screen.queryByTestId('navigation')).not.toBeInTheDocument();
  });

  test('Render with login', () => {
    render(<DesktopHeader user={{ name: 'Test user' }} />);

    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  test('Auth Controls for Login', () => {
    render(<DesktopHeader user={{ name: 'Test user' }} />);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  test('Auth Controls for Logout', () => {
    render(<DesktopHeader user={null} />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('Auth Controls Logout', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
      } as Response)
    ) as unknown as typeof fetch;

    render(<DesktopHeader user={{ name: 'Test user' }} />);
    const btn = screen.getByText('Sign Out');

    fireEvent.click(btn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/logout', { method: 'POST' });
      expect(mockPush).toHaveBeenCalledWith('/');
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  test('Auth Controls Navigation', async () => {
    render(<DesktopHeader user={null} />);

    const signInButton = screen.getByText('Sign In');
    const signUpButton = screen.getByText('Sign Up');

    fireEvent.click(signInButton);
    expect(mockPush).toHaveBeenCalledWith('/sign-in');

    fireEvent.click(signUpButton);
    expect(mockPush).toHaveBeenCalledWith('/sign-up');
  });

  test('Render Interface Settings', () => {
    render(<DesktopHeader user={null} />);
    expect(screen.getByTestId('interface-settings')).toBeInTheDocument();
  });
});
