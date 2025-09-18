import { describe, test, beforeEach, vi, expect } from 'vitest';
import { NextResponse } from 'next/server';
import { adminAuth } from '@/server/firebase-admin';
import { POST } from '@/app/api/session/route';

vi.mock('@/shared/config/navigation', () => ({
  appRoutes: { home: '/' },
}));

const setSpy = vi.fn();
const cookiesMock = vi.fn();

vi.mock('next/headers', () => ({
  cookies: (...args: unknown[]) => cookiesMock(...args),
}));
vi.mock('@/shared/config/auth', () => ({
  SESSION_TTL: 3600000,
}));

vi.mock('@/server/firebase-admin', () => ({
  adminAuth: { createSessionCookie: vi.fn() },
}));

const createSessionCookie = vi.mocked(adminAuth.createSessionCookie);

describe('Login API Route (POST)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cookiesMock.mockResolvedValue({ set: setSpy });
  });

  test('creates session cookie and sets it (204)', async () => {
    const fakeToken = 'FAKE_ID_TOKEN';
    const fakeSession = 'FAKE_SESSION_COOKIE';
    createSessionCookie.mockResolvedValueOnce(fakeSession);

    const req = new Request('http://localhost/api/session', {
      method: 'POST',
      body: JSON.stringify({ idToken: fakeToken }),
    });

    const res = await POST(req);

    expect(createSessionCookie).toHaveBeenCalledWith(fakeToken, { expiresIn: 3600000 });
    expect(setSpy).toHaveBeenCalledWith('session', fakeSession, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 3600,
    });

    expect(res).toBeInstanceOf(NextResponse);
    expect(res.status).toBe(204);
  });

  test('returns 401 when createSessionCookie throws', async () => {
    createSessionCookie.mockRejectedValueOnce(new Error('bad token'));

    const req = new Request('http://localhost/api/session', {
      method: 'POST',
      body: JSON.stringify({ idToken: 'BAD' }),
    });

    const res = await POST(req);
    const text = await res.text();

    expect(res.status).toBe(401);
    expect(text).toBe('Unauthorized');
    expect(setSpy).not.toHaveBeenCalled();
  });
});
