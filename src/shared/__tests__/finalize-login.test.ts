import { describe, test, vi, beforeEach, expect } from 'vitest';
import { finalizeLogin } from '@/shared/lib/auth/finalize-login';

vi.mock('firebase/auth', () => ({
  getIdToken: vi.fn(),
}));

vi.mock('@/shared/config/firebase', () => ({
  auth: { currentUser: { uid: '123' } },
}));

import { getIdToken } from 'firebase/auth';
const mockedGetIdToken = vi.mocked(getIdToken);

type FetchFn = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

describe('finalizeLogin', () => {
  let fetchMock: ReturnType<typeof vi.fn<FetchFn>>;

  beforeEach(() => {
    vi.clearAllMocks();

    fetchMock = vi.fn<FetchFn>();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  test('calls getIdToken and posts token to /api/session', async () => {
    mockedGetIdToken.mockResolvedValueOnce('TOKEN123');
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 200 }));

    await finalizeLogin();

    expect(mockedGetIdToken).toHaveBeenCalledWith({ uid: '123' }, true);
    expect(fetchMock).toHaveBeenCalledWith('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: 'TOKEN123' }),
    });
  });

  test('throws if getIdToken rejects', async () => {
    mockedGetIdToken.mockRejectedValueOnce(new Error('fail'));

    await expect(finalizeLogin()).rejects.toThrow('fail');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('throws if fetch rejects', async () => {
    mockedGetIdToken.mockResolvedValueOnce('TOKEN123');
    fetchMock.mockRejectedValueOnce(new Error('net error'));

    await expect(finalizeLogin()).rejects.toThrow('net error');
  });
});
