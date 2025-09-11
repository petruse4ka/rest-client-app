import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { adminAuth } from '@/server/firebase-admin';

export async function POST(req: Request) {
  const { idToken } = await req.json();
  //TODO: for test
  //const expiresIn = 1000 * 60 * 60 * 24 * 7; // 7 days
  const expiresIn = 1000 * 60 * 5; // 5 min

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
