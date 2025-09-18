import { describe, test, beforeEach, vi, expect } from 'vitest';
import React from 'react';
import { render, screen } from './test-utils/test-utils';
import type { RequestHistoryItem } from '@/types/interfaces';
import { HttpMethod } from '@/types/types';
import HistoryPage from '@/app/[locale]/history/page';
import type { DecodedIdToken } from 'firebase-admin/auth';

type CookieStore = {
  get: (name: string) => { value?: string } | undefined;
};

const hoist = vi.hoisted(() => {
  return {
    cookiesMock: vi.fn<() => Promise<CookieStore>>(),
  };
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

vi.mock('next/headers', () => ({
  cookies: hoist.cookiesMock,
}));
vi.mock('@/server/firebase-admin', () => ({
  adminAuth: { verifySessionCookie: vi.fn() },
}));
import { adminAuth } from '@/server/firebase-admin';
const verifySessionCookieMock = vi.mocked(adminAuth.verifySessionCookie);

vi.mock('@/entities/request-log/model/fetch-request-logs', () => ({
  fetchRequestLogs: vi.fn(),
}));
import { fetchRequestLogs } from '@/entities/request-log/model/fetch-request-logs';
const fetchRequestLogsMock = vi.mocked(fetchRequestLogs);

let lastItemsPassed: RequestHistoryItem[] | undefined;
vi.mock('@/app/[locale]/history/history-client', () => ({
  __esModule: true,
  default: (props: { items: RequestHistoryItem[] }) => {
    lastItemsPassed = props.items;
    return <div data-testid="history-view" />;
  },
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

  test('returns null when no session cookie', async () => {
    hoist.cookiesMock.mockResolvedValue({
      get: () => undefined,
    });

    const node = await HistoryPage();
    expect(node).toBeNull();

    expect(verifySessionCookieMock).not.toHaveBeenCalled();
    expect(fetchRequestLogsMock).not.toHaveBeenCalled();
  });

  test('verifies session, fetches logs and renders HistoryView with items', async () => {
    hoist.cookiesMock.mockResolvedValue({
      get: (name: string) => (name === 'session' ? { value: 'TOKEN123' } : undefined),
    });

    const decoded: DecodedIdToken = {
      uid: 'user-42',
      aud: 'test-aud',
      iss: 'test-iss',
      sub: 'user-42',
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
      auth_time: Math.floor(Date.now() / 1000),
      firebase: { identities: {}, sign_in_provider: 'custom' },
    };
    verifySessionCookieMock.mockResolvedValue(decoded);

    const items: RequestHistoryItem[] = [
      makeItem('1', '2024-02-01T10:00:00Z'),
      makeItem('2', '2024-03-01T10:00:00Z', 404, HttpMethod.POST),
    ];
    fetchRequestLogsMock.mockResolvedValue(items);

    const node = await HistoryPage();
    expect(node).not.toBeNull();

    render(node as React.ReactElement);
    expect(screen.getByTestId('history-view')).toBeInTheDocument();

    expect(verifySessionCookieMock).toHaveBeenCalledWith('TOKEN123', true);
    expect(fetchRequestLogsMock).toHaveBeenCalledWith('user-42');

    expect(lastItemsPassed).toEqual(items);
  });
});
