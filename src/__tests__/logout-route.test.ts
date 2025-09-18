import { describe, test, beforeEach, afterEach, vi, expect } from 'vitest';
import { NextResponse } from 'next/server';
import { POST } from '@/app/api/logout/route';

vi.mock('@/shared/config/navigation', () => ({
  appRoutes: { home: '/' },
}));

const setSpy = vi.fn();
const cookiesMock = vi.fn();

vi.mock('next/headers', () => ({
  cookies: (...args: unknown[]) => cookiesMock(...args),
}));

describe('Sign-out API Route (POST)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cookiesMock.mockResolvedValue({ set: setSpy });
  });

  afterEach(() => {
    vi.unstubAllEnvs?.();
  });

  test('sets empty session cookie with maxAge 0 (non-production secure=false)', async () => {
    vi.stubEnv('NODE_ENV', 'test');

    const res = await POST();

    expect(setSpy).toHaveBeenCalledWith('session', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    expect(res).toBeInstanceOf(NextResponse);
    expect(res.status).toBe(204);
  });

  test('sets secure cookie in production (secure=true)', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    const res = await POST();

    expect(setSpy).toHaveBeenCalledWith('session', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
    expect(res.status).toBe(204);
  });
});
