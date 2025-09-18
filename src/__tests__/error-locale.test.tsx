import { screen } from '@testing-library/react';
import { render } from './test-utils/test-utils';
import LocaleError from '../app/[locale]/error';
import enMessages from '@/shared/i18n/messages/en.json';
import { orangeColors } from '@/shared/style/colors';

const mockReload = vi.fn();

Object.defineProperty(window, 'location', {
  value: {
    reload: mockReload,
  },
  writable: true,
});

vi.mock('@/shared/i18n/navigation', () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
    }),
  };
});

describe('LocaleError', () => {
  beforeEach(() => {
    mockReload.mockClear();
  });

  test('renders error page with translated title and message', () => {
    render(<LocaleError />);

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('error-container')).toBeInTheDocument();
    expect(screen.getByTestId('error-title')).toHaveTextContent(enMessages.ErrorBoundary.title);
    expect(screen.getByTestId('error-message')).toHaveTextContent(enMessages.ErrorBoundary.message);
  });

  test('renders refresh button with translated text', () => {
    render(<LocaleError />);

    const refreshButton = screen.getByTestId('error-refresh-button');
    expect(refreshButton).toBeInTheDocument();
    expect(refreshButton).toHaveTextContent(enMessages.ErrorBoundary.buttonText);
  });

  test('calls window.location.reload when refresh button is clicked', () => {
    render(<LocaleError />);

    const refreshButton = screen.getByTestId('error-refresh-button');
    refreshButton.click();

    expect(mockReload).toHaveBeenCalledTimes(1);
  });
});
