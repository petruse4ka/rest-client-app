import { screen, waitFor, within } from '@testing-library/react';
import { render } from './test-utils/test-utils';
import { describe, test, beforeEach, vi, expect } from 'vitest';
import enMessages from '@/shared/i18n/messages/en.json';
import type { RequestHistoryItem } from '@/types/types';
import { HttpMethod } from '@/types/types';

vi.mock('@ant-design/v5-patch-for-react-19', () => ({}));

vi.mock('@/shared/i18n/navigation', () => ({
  Link: (props: React.ComponentProps<'a'>) => <a {...props} />,
}));

vi.mock('@/shared/utils/translate-formatter', () => ({
  useFormatters: () => ({
    formatMs: (n: number) => `${n} ms`,
    formatBytes: (n: number) => `${n} bytes`,
  }),
}));

export const makeItem = (
  id: string,
  ts: string,
  status: number = 200,
  method: HttpMethod = HttpMethod.GET,
  appRouterURL: string = '/rest-client',
  errorDetails: string = ''
): RequestHistoryItem => ({
  id,
  url: `/api/${id}`,
  appRouterURL,
  method,
  timestamp: ts,
  durationMs: 100,
  statusCode: status,
  requestSize: 10,
  responseSize: 20,
  errorDetails,
});
describe('HistoryView', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await vi.resetModules();
  });

  test('renders empty state when history is empty', async () => {
    const { default: HistoryView } = await import(
      '@/app/[locale]/(protected)/history/history-client'
    );
    const { container } = render(<HistoryView items={[]} />);

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

  test('expands panel and shows details with translated labels', async () => {
    const items: RequestHistoryItem[] = [
      makeItem('a', '2024-05-01T12:00:00Z', 500, HttpMethod.GET),
    ];

    const { default: HistoryView } = await import(
      '@/app/[locale]/(protected)/history/history-client'
    );
    const { container } = render(<HistoryView items={items} />);

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
