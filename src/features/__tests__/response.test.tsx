import { render, screen } from '@testing-library/react';
import { Response } from '../rest-client/response';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('Response', () => {
  test('renders loading state', () => {
    render(<Response loading={true} error={null} response={null} />);

    expect(screen.getAllByTestId('loading-spinner')).toHaveLength(2);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  test('renders error state', () => {
    render(<Response loading={false} error="Network error" response={null} />);

    expect(screen.getByTestId('error-card')).toBeInTheDocument();
    expect(screen.getByText('error')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  test('renders response state', () => {
    const mockResponse = {
      status: 200,
      statusText: 'OK',
      data: { message: 'Success' },
    };

    render(<Response loading={false} error={null} response={mockResponse} />);

    expect(screen.getByTestId('response-card')).toBeInTheDocument();
    expect(screen.getByText('response')).toBeInTheDocument();
    expect(screen.getByText('status: 200 OK')).toBeInTheDocument();
  });

  test('renders nothing when no state', () => {
    const { container } = render(<Response loading={false} error={null} response={null} />);

    expect(container.firstChild).toBeNull();
  });
});
