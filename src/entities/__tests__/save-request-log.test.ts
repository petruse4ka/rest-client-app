import { describe, test, beforeEach, vi, expect } from 'vitest';
import type { LogRequestPayload } from '@/types/interfaces';
import { HttpMethod } from '@/types/types';

type AddFn = (data: unknown) => Promise<void>;
type SubCollectionRef = { add: AddFn };
type DocRef = { collection: (name: string) => SubCollectionRef };
type RootCollectionRef = { doc: (id: string) => DocRef };

const addMock = vi.fn<(data: unknown) => Promise<void>>();
const subCollectionRef: SubCollectionRef = {
  add: (data) => addMock(data),
};

const docMock = vi.fn<(id: string) => DocRef>();
const collectionMock = vi.fn<(name: string) => RootCollectionRef>();

vi.mock('@/server/firebase-admin', () => ({
  db: {
    collection: (name: string) => collectionMock(name),
  },
}));

import { saveRequestLog } from '@/entities/request-log/model/save-request-log';

describe('saveRequestLog', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    collectionMock.mockImplementation((name: string) => {
      if (name !== 'users') throw new Error('expected root collection "users"');
      return {
        doc: (id: string) => {
          docMock(id);
          return {
            collection: (sub: string) => {
              if (sub !== 'requestLogs') throw new Error('expected sub-collection "requestLogs"');
              return subCollectionRef;
            },
          };
        },
      };
    });

    addMock.mockResolvedValue();
  });

  test('writes to users/{uid}/requestLogs with payload + createdAt: Date', async () => {
    const nowBefore = Date.now();

    const payload: LogRequestPayload = {
      method: HttpMethod.POST,
      url: 'https://api.example.com/users',
      appRouterURL: '/rest-client',
      statusCode: 201,
      requestSize: 123,
      responseSize: 456,
      durationMs: 789,
      errorDetails: 'created',
    };

    await saveRequestLog({ uid: 'user-42', ...payload });

    expect(collectionMock).toHaveBeenCalledWith('users');
    expect(docMock).toHaveBeenCalledWith('user-42');

    expect(addMock).toHaveBeenCalledTimes(1);
    const arg = addMock.mock.calls[0][0] as Record<string, unknown>;

    expect(arg).toMatchObject(payload);

    expect(arg).toHaveProperty('createdAt');
    expect(arg.createdAt).toBeInstanceOf(Date);

    const createdAtMs = (arg.createdAt as Date).getTime();
    const nowAfter = Date.now();
    expect(createdAtMs).toBeGreaterThanOrEqual(nowBefore);
    expect(createdAtMs).toBeLessThanOrEqual(nowAfter);
  });

  test('does not mutate input object and does not include uid in add payload', async () => {
    const params = {
      uid: 'u1',
      method: HttpMethod.GET,
      url: 'https://api.example.com/ping',
      appRouterURL: '/rest-client',
      statusCode: 200,
      requestSize: 0,
      responseSize: 1,
      durationMs: 2,
      errorDetails: '',
    } as const;

    await saveRequestLog({ ...params });

    const arg = addMock.mock.calls[0][0] as Record<string, unknown>;
    expect(arg).not.toHaveProperty('uid');

    expect(params).toEqual({
      uid: 'u1',
      method: HttpMethod.GET,
      url: 'https://api.example.com/ping',
      appRouterURL: '/rest-client',
      statusCode: 200,
      requestSize: 0,
      responseSize: 1,
      durationMs: 2,
      errorDetails: '',
    });
  });
});
