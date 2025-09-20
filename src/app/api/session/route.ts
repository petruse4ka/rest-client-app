export const runtime = 'nodejs';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { adminAuth } from '@/server/firebase-admin';
import { SESSION_TTL } from '@/shared/config/auth';

export async function POST(req: Request) {
  const { idToken } = await req.json();

  const expiresIn = SESSION_TTL;

  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    const cookieStore = await cookies();
    cookieStore.set('session', sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: expiresIn / 1000,
    });
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse('Unauthorized', { status: 401 });
  }
}
