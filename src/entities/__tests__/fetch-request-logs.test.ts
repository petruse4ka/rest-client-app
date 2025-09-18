import { describe, test, beforeEach, vi, expect } from 'vitest';
import { Timestamp } from 'firebase-admin/firestore';
import type { FirestoreDoc } from '@/types/types';

type Snap = { docs: Array<{ id: string; data: () => Partial<FirestoreDoc> }> };

type SubCollection = {
  orderBy: (field: string, dir: 'asc' | 'desc') => SubCollection;
  get: () => Promise<Snap>;
};
type DocRef = {
  collection: (name: string) => SubCollection;
};
type RootCollection = {
  doc: (id: string) => DocRef;
};

const orderByMock = vi.fn<(field: string, dir: 'asc' | 'desc') => SubCollection>();
const getMock = vi.fn<() => Promise<Snap>>();
const subCollectionMock = {
  orderBy: (...args: [string, 'asc' | 'desc']) => orderByMock(...args),
  get: () => getMock(),
} as SubCollection;

const docMock = vi.fn<(id: string) => DocRef>();
const collectionMock = vi.fn<(name: string) => RootCollection>();

vi.mock('@/server/firebase-admin', () => ({
  db: {
    collection: (name: string) => collectionMock(name),
  },
}));

import { fetchRequestLogs } from '@/entities/request-log/model/fetch-request-logs';
import { HttpMethod } from '../../types/types';

describe('fetchRequestLogs', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    collectionMock.mockImplementation((name: string): RootCollection => {
      if (name !== 'users') throw new Error('expected root collection "users"');
      return {
        doc: (id: string) => {
          docMock(id);
          return {
            collection: (sub: string) => {
              if (sub !== 'requestLogs') throw new Error('expected sub-collection "requestLogs"');
              return subCollectionMock;
            },
          };
        },
      };
    });

    orderByMock.mockReturnValue(subCollectionMock);
  });

  test('builds correct query and maps docs when createdAt is Timestamp', async () => {
    const ts1 = Timestamp.fromDate(new Date('2024-03-01T10:00:00Z'));
    const ts2 = Timestamp.fromDate(new Date('2024-02-01T10:00:00Z'));

    const snap: Snap = {
      docs: [
        {
          id: 'a',
          data: () => ({
            url: 'https://api.example.com/a',
            appRouterURL: '/rest-client',
            method: HttpMethod.GET,
            statusCode: 200,
            requestSize: 10,
            responseSize: 20,
            durationMs: 123,
            errorDetails: '',
            createdAt: ts1,
          }),
        },
        {
          id: 'b',
          data: () => ({
            url: 'https://api.example.com/b',
            appRouterURL: '/rest-client',
            method: HttpMethod.POST,

            createdAt: ts2,
          }),
        },
      ],
    };
    getMock.mockResolvedValueOnce(snap);

    const uid = 'user-42';
    const result = await fetchRequestLogs(uid);

    expect(collectionMock).toHaveBeenCalledWith('users');
    expect(docMock).toHaveBeenCalledWith(uid);
    expect(orderByMock).toHaveBeenCalledWith('createdAt', 'desc');
    expect(getMock).toHaveBeenCalledTimes(1);

    expect(result[0]).toEqual({
      id: 'a',
      url: 'https://api.example.com/a',
      appRouterURL: '/rest-client',
      method: 'GET',
      statusCode: 200,
      requestSize: 10,
      responseSize: 20,
      durationMs: 123,
      errorDetails: '',
      timestamp: new Date('2024-03-01T10:00:00Z').toISOString(),
    });

    expect(result[1]).toEqual({
      id: 'b',
      url: 'https://api.example.com/b',
      appRouterURL: '/rest-client',
      method: 'POST',
      statusCode: 0,
      requestSize: 0,
      responseSize: 0,
      durationMs: 0,
      errorDetails: undefined,
      timestamp: new Date('2024-02-01T10:00:00Z').toISOString(),
    });
  });

  test('maps when createdAt is already a Date (not a Timestamp)', async () => {
    const d = new Date('2024-05-05T12:34:56Z');

    const snap: Snap = {
      docs: [
        {
          id: 'x',
          data: () => ({
            url: 'https://api.example.com/x',
            appRouterURL: '/rest-client',
            method: HttpMethod.GET,
            createdAt: d,
          }),
        },
      ],
    };
    getMock.mockResolvedValueOnce(snap);

    const out = await fetchRequestLogs('uid');
    expect(out).toHaveLength(1);
    expect(out[0].timestamp).toBe(d.toISOString());
  });
});
