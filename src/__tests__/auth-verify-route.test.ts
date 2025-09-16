import { describe, test, beforeEach, vi, expect } from 'vitest';
import { NextResponse } from 'next/server';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { POST } from '@/app/api/auth/verify/route';

const cookiesMock = vi.fn();
vi.mock('next/headers', () => ({
  cookies: (...args: unknown[]) => cookiesMock(...args),
}));
vi.mock('@/server/firebase-admin', () => ({
  adminAuth: {
    verifySessionCookie: vi.fn(),
  },
}));
import { adminAuth } from '@/server/firebase-admin';
const verifySessionCookie = vi.mocked(adminAuth.verifySessionCookie);

describe('Verify-session API Route (POST)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('returns 204 if session cookie is valid', async () => {
    cookiesMock.mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: 'VALID_SESSION' }),
    });

    const decoded: DecodedIdToken = {
      aud: 'test-aud',
      auth_time: 1,
      exp: 9999999999,
      firebase: { identities: {}, sign_in_provider: 'custom' },
      iat: 1,
      iss: 'https://securetoken.google.com/project-id',
      sub: 'user123',
      uid: 'user123',
    };

    verifySessionCookie.mockResolvedValueOnce(decoded);

    const res = await POST();

    expect(verifySessionCookie).toHaveBeenCalledWith('VALID_SESSION', true);
    expect(res).toBeInstanceOf(NextResponse);
    expect(res.status).toBe(204);
  });

  test('returns 401 if session cookie is missing', async () => {
    cookiesMock.mockResolvedValue({
      get: vi.fn().mockReturnValue(undefined),
    });
    verifySessionCookie.mockRejectedValueOnce(new Error('no cookie'));

    const res = await POST();

    expect(verifySessionCookie).toHaveBeenCalledWith('', true);
    expect(res.status).toBe(401);
  });

  test('returns 401 if verifySessionCookie throws', async () => {
    cookiesMock.mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: 'BAD_SESSION' }),
    });
    verifySessionCookie.mockRejectedValueOnce(new Error('invalid'));

    const res = await POST();

    expect(verifySessionCookie).toHaveBeenCalledWith('BAD_SESSION', true);
    expect(res.status).toBe(401);
  });
});
