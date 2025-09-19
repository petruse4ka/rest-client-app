import { fireEvent, screen, waitFor } from '@testing-library/react';
import { HeaderApp } from '../header';
import { vi } from 'vitest';
import { render } from '@/__tests__/test-utils/test-utils';
import MobileHeader from '../header/mobile-header';

vi.mock('@/shared/i18n/navigation', () => ({
  usePathname: vi.fn(() => '/some/path'),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
  useLocale: vi.fn(() => 'en'),
}));

describe('Header Mobile', () => {
  test('Render', () => {
    render(<HeaderApp user={null} />);

    expect(screen.queryByTestId('mobile-header')).toBeInTheDocument();
  });

  test('Drawer opens and closes', async () => {
    render(<MobileHeader user={null} />);

    const menuButton = screen.getByRole('button', { name: /Open menu/i });

    expect(screen.queryByRole('presentation')).toBeNull();
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText('Close Button');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });
});
