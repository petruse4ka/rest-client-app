import React from 'react';
import { render, screen, waitFor } from './test-utils/test-utils';
import { describe, test, beforeEach, vi, expect } from 'vitest';
import type { RequestHistoryItem } from '@/types/types';
import { HttpMethod } from '@/types/types';
import HistoryPage from '@/app/[locale]/(protected)/history/page';
import { fetchRequestLogs } from '@/entities/request-log/model/fetch-request-logs';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => {
    const translations = {
      loading: 'Loading...',
    };
    return translations[key as keyof typeof translations] || key;
  }),
}));

let lastItemsPassed: RequestHistoryItem[] | undefined;

vi.mock('@/app/[locale]/(protected)/history/history-client-wrapper', () => ({
  default: ({ items }: { items: RequestHistoryItem[] }) => {
    lastItemsPassed = items;
    return (
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
    );
  },
}));

vi.mock('@/entities/request-log/model/fetch-request-logs', () => ({
  fetchRequestLogs: vi.fn(),
}));

const fetchRequestLogsMock = vi.mocked(fetchRequestLogs);

const getServerUserMock = vi.fn();

vi.mock('@/server/get-server-user', () => ({
  getServerUser: () => getServerUserMock(),
}));

const makeItem = (
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

describe('HistoryPage (server component)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    lastItemsPassed = undefined;
  });

  test('returns null when user is not authenticated', async () => {
    getServerUserMock.mockResolvedValue(null);

    const node = await HistoryPage();

    expect(node).toBeNull();
  });

  test('does not fetch logs when user is not authenticated', async () => {
    getServerUserMock.mockResolvedValue(null);

    await HistoryPage();

    expect(fetchRequestLogsMock).not.toHaveBeenCalled();
  });

  test('renders history view when user is authenticated', async () => {
    getServerUserMock.mockResolvedValue({ name: 'Test User', uid: 'user-42' });
    const items: RequestHistoryItem[] = [makeItem('1', '2024-02-01T10:00:00Z')];
    fetchRequestLogsMock.mockResolvedValue(items);

    const node = await HistoryPage();
    render(node as React.ReactElement);

    await waitFor(() => {
      expect(screen.getByTestId('history-view')).toBeInTheDocument();
    });
  });

  test('fetches request logs with authenticated user uid', async () => {
    const userId = 'user-42';
    getServerUserMock.mockResolvedValue({ name: 'Test User', uid: userId });
    fetchRequestLogsMock.mockResolvedValue([]);

    await HistoryPage();

    expect(fetchRequestLogsMock).toHaveBeenCalledWith(userId);
  });

  test('passes fetched items to history client component', async () => {
    getServerUserMock.mockResolvedValue({ name: 'Test User', uid: 'user-42' });
    const items: RequestHistoryItem[] = [
      makeItem('1', '2024-02-01T10:00:00Z'),
      makeItem('2', '2024-03-01T10:00:00Z', 404, HttpMethod.POST),
    ];
    fetchRequestLogsMock.mockResolvedValue(items);

    const node = await HistoryPage();
    render(node as React.ReactElement);

    await waitFor(() => {
      expect(lastItemsPassed).toEqual(items);
    });
  });
});
