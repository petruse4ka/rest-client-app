import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { appRoutes } from '@/shared/config/navigation';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: appRoutes.home,
    maxAge: 0,
  });
  return new NextResponse(null, { status: 204 });
}
