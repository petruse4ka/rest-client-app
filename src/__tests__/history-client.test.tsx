import { screen, waitFor, within } from '@testing-library/react';
import { render } from './test-utils/test-utils';
import { describe, test, beforeEach, vi, expect } from 'vitest';
import enMessages from '@/shared/i18n/messages/en.json';
import type { RequestHistoryItem } from '@/types/interfaces';
import { HttpMethod } from '../types/types';

vi.mock('@ant-design/v5-patch-for-react-19', () => ({}));
vi.mock('@/shared/i18n/navigation', () => ({
  Link: (props: React.ComponentProps<'a'>) => <a {...props} />,
}));
vi.mock('@/shared/utils/sort-by-timestamp', async () => {
  const mod = await vi.importActual<typeof import('@/shared/utils/sort-by-timestamp')>(
    '@/shared/utils/sort-by-timestamp'
  );
  return mod;
});

const makeItem = (
  id: string,
  ts: string,
  status = 200,
  method: HttpMethod = HttpMethod.GET
): RequestHistoryItem => ({
  id,
  url: `/api/${id}`,
  method,
  timestamp: ts,
  durationMs: 100,
  statusCode: status,
  requestSize: 10,
  responseSize: 20,
});

describe('HistoryView', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await vi.resetModules();
  });

  test('renders empty state when history is empty', async () => {
    vi.doMock('@/app/[locale]/history/mock-data', () => ({
      mockHistory: [] as RequestHistoryItem[],
    }));

    const { default: HistoryView } = await import('@/app/[locale]/history/history-client');
    const { container } = render(<HistoryView />);

    expect(screen.getByRole('heading', { name: enMessages.History.title })).toBeInTheDocument();

    await waitFor(() => {
      const emptyEl = container.querySelector('.ant-empty') as HTMLElement | null;
      expect(emptyEl).toBeInTheDocument();
      const w = within(emptyEl!);
      expect(w.getByText(enMessages.History.emptyTitle)).toBeInTheDocument();
      expect(w.getByText(enMessages.History.emptySubtitle)).toBeInTheDocument();
    });

    const btn = screen.getByRole('button', { name: enMessages.History.goRestClient });
    expect(btn).toBeInTheDocument();
    expect(btn.closest('a')).toHaveAttribute('href', '/rest-client');
  });

  test('renders list and sorts by timestamp desc ', async () => {
    const items = [
      makeItem('1', '2024-02-01T10:00:00Z', 200),
      makeItem('2', '2024-03-01T10:00:00Z', 404, HttpMethod.POST),
      makeItem('3', '2024-01-01T10:00:00Z', 200),
    ];
    vi.doMock('@/app/[locale]/history/mock-data', () => ({ mockHistory: items }));

    const { default: HistoryView } = await import('@/app/[locale]/history/history-client');
    const { container } = render(<HistoryView />);

    await waitFor(() => {
      const headers = container.querySelectorAll('.ant-collapse-header');
      expect(headers.length).toBe(3);
    });

    const links = screen.getAllByRole('link', { name: /\/api\// });
    expect(links.length).toBe(3);
    expect(links[0]).toHaveTextContent('/api/2');
    expect(links[0]).toHaveAttribute('href', '/rest-client');

    expect(screen.getAllByText('404')[0]).toBeInTheDocument();
  });

  test('expands panel and shows details with translated labels', async () => {
    const items = [makeItem('a', '2024-05-01T12:00:00Z', 500)];
    vi.doMock('@/app/[locale]/history/mock-data', () => ({ mockHistory: items }));

    const { default: HistoryView } = await import('@/app/[locale]/history/history-client');
    const { container } = render(<HistoryView />);

    await waitFor(() => {
      expect(container.querySelector('.ant-collapse')).toBeInTheDocument();
    });

    (container.querySelector('.ant-collapse-item .ant-collapse-header') as HTMLElement).click();

    await waitFor(() => {
      expect(screen.getByText(`${enMessages.History.duration}:`)).toBeInTheDocument();
      expect(screen.getByText(`${enMessages.History.requestSize}:`)).toBeInTheDocument();
      expect(screen.getByText(`${enMessages.History.responseSize}:`)).toBeInTheDocument();
      expect(screen.getByText(`${enMessages.History.timestamp}:`)).toBeInTheDocument();
    });
  });
});
