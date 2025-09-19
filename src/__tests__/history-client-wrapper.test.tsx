import { render, screen } from '@testing-library/react';
import HistoryClientWrapper from '@/app/[locale]/history/history-client-wrapper';
import { describe, test, expect, vi } from 'vitest';
import type { RequestHistoryItem } from '@/types/types';

vi.mock('@/shared/UI', () => ({
  LoadingSpinner: ({ tip }: { tip: string }) => (
    <div data-testid="loading-spinner">
      <div>Loading...</div>
      <div>{tip}</div>
    </div>
  ),
}));

vi.mock('@/app/[locale]/history/history-client', () => ({
  default: ({ items }: { items: RequestHistoryItem[] }) => (
    <div data-testid="history-view">
      <h1>History</h1>
      <div data-testid="history-items">
        {items.map((item, index) => (
          <div key={index} data-testid={`history-item-${index}`}>
            {item.method} {item.url}
          </div>
        ))}
      </div>
    </div>
  ),
}));

describe('HistoryClientWrapper', () => {
  test('renders loading spinner when loading', () => {
    const mockItems: RequestHistoryItem[] = [];
    const loadingText = 'Loading history...';

    render(<HistoryClientWrapper items={mockItems} loadingText={loadingText} />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading history...')).toBeInTheDocument();
  });

  test('renders empty history when no items', async () => {
    const mockItems: RequestHistoryItem[] = [];
    const loadingText = 'Loading history...';

    render(<HistoryClientWrapper items={mockItems} loadingText={loadingText} />);

    await screen.findByTestId('history-view');

    expect(screen.getByTestId('history-view')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByTestId('history-items')).toBeInTheDocument();
  });
});
