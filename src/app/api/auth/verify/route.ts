export const runtime = 'nodejs';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { adminAuth } from '@/server/firebase-admin';

export async function POST() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value || '';
  try {
    await adminAuth.verifySessionCookie(session, true);
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 401 });
  }
}
