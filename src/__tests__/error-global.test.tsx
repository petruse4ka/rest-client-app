import { screen } from '@testing-library/react';
import { render } from './test-utils/test-utils';
import GlobalError from '../app/error';

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

describe('GlobalError', () => {
  beforeEach(() => {
    mockReload.mockClear();
  });

  test('renders error page with correct title and message', () => {
    render(<GlobalError />);

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('error-container')).toBeInTheDocument();
    expect(screen.getByTestId('error-title')).toHaveTextContent('Something went wrong');
    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'An unexpected error occurred. Please try refreshing the page.'
    );
  });

  test('renders refresh button with correct text', () => {
    render(<GlobalError />);

    const refreshButton = screen.getByTestId('error-refresh-button');
    expect(refreshButton).toBeInTheDocument();
    expect(refreshButton).toHaveTextContent('Refresh page');
  });

  test('calls window.location.reload when refresh button is clicked', () => {
    render(<GlobalError />);

    const refreshButton = screen.getByTestId('error-refresh-button');
    refreshButton.click();

    expect(mockReload).toHaveBeenCalledTimes(1);
  });
});
