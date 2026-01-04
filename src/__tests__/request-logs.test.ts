import { describe, test, beforeEach, vi, expect } from 'vitest';
import { NextRequest } from 'next/server';
import type { DecodedIdToken } from 'firebase-admin/auth';

vi.mock('@/server/firebase-admin', () => ({
  adminAuth: { verifySessionCookie: vi.fn() },
}));
import { adminAuth } from '@/server/firebase-admin';
const verifySessionCookie = vi.mocked(adminAuth.verifySessionCookie);

vi.mock('@/entities/request-log/model/save-request-log', () => ({
  saveRequestLog: vi.fn(),
}));
import { saveRequestLog } from '@/entities/request-log/model/save-request-log';
const mockedSaveRequestLog = vi.mocked(saveRequestLog);

import { POST } from '@/app/api/request-logs/route';

function makeDecoded(uid: string): DecodedIdToken {
  return {
    uid,
    aud: 'test',
    iss: 'test',
    sub: uid,
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000),
    auth_time: Math.floor(Date.now() / 1000),
    firebase: { identities: {}, sign_in_provider: 'custom' },
  };
}

function makeRequest(body: unknown, cookie: string | null): NextRequest {
  const headers = new Headers({ 'content-type': 'application/json' });
  if (cookie) headers.set('cookie', `session=${cookie}`);
  return new NextRequest('http://localhost/api/request-log', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
}

describe('request-log API Route (POST)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('returns 401 when session cookie is missing', async () => {
    const req = makeRequest(
      { method: 'GET', url: 'https://api', appRouterURL: '/rest-client' },
      null
    );

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data).toEqual({ error: 'Unauthorized' });
    expect(verifySessionCookie).not.toHaveBeenCalled();
    expect(mockedSaveRequestLog).not.toHaveBeenCalled();
  });

  test('returns 400 for invalid payload (missing url/appRouterURL/method)', async () => {
    const req = makeRequest({ url: '', appRouterURL: '', method: '' }, 'TOKEN123');
    verifySessionCookie.mockResolvedValueOnce(makeDecoded('u1'));

    const res = await POST(req);
    const data = await res.json();

    expect(verifySessionCookie).toHaveBeenCalledWith('TOKEN123', true);
    expect(res.status).toBe(400);
    expect(data).toEqual({ error: 'Invalid payload' });
    expect(mockedSaveRequestLog).not.toHaveBeenCalled();
  });

  test('happy path: verifies session, normalizes numbers and calls saveRequestLog, returns 200', async () => {
    verifySessionCookie.mockResolvedValueOnce(makeDecoded('user-42'));

    const req = makeRequest(
      {
        method: 'GET',
        url: 'https://api.example.com/users',
        appRouterURL: '/rest-client',
        statusCode: '404',
        requestSize: '10',
        responseSize: '20',
        durationMs: '123',
      },
      'TOKEN123'
    );

    const res = await POST(req);
    const data = await res.json();

    expect(verifySessionCookie).toHaveBeenCalledWith('TOKEN123', true);
    expect(mockedSaveRequestLog).toHaveBeenCalledWith({
      uid: 'user-42',
      method: 'GET',
      url: 'https://api.example.com/users',
      appRouterURL: '/rest-client',
      statusCode: 404,
      requestSize: 10,
      responseSize: 20,
      durationMs: 123,
      errorDetails: 'undefined',
    });

    expect(res.status).toBe(200);
    expect(data).toEqual({ ok: true });
  });

  test('returns 500 when verifySessionCookie throws', async () => {
    verifySessionCookie.mockRejectedValueOnce(new Error('boom'));

    const req = makeRequest(
      { method: 'GET', url: 'https://api', appRouterURL: '/rest-client' },
      'TOKEN123'
    );

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json).toHaveProperty('error');
    expect(mockedSaveRequestLog).not.toHaveBeenCalled();
  });

  test('returns 500 when saveRequestLog throws', async () => {
    verifySessionCookie.mockResolvedValueOnce(makeDecoded('u777'));
    mockedSaveRequestLog.mockRejectedValueOnce(new Error('db down'));

    const req = makeRequest(
      {
        method: 'POST',
        url: 'https://api',
        appRouterURL: '/rest-client',
        statusCode: 201,
        requestSize: 1,
        responseSize: 2,
        durationMs: 3,
        errorDetails: 'oops',
      },
      'TOKEN123'
    );

    const res = await POST(req);
    const json = await res.json();

    expect(verifySessionCookie).toHaveBeenCalled();
    expect(mockedSaveRequestLog).toHaveBeenCalled();
    expect(res.status).toBe(500);
    expect(json).toHaveProperty('error');
  });
});
