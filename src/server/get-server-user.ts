import 'server-only';

import { cookies } from 'next/headers';
import { adminAuth } from './firebase-admin';

export async function getServerUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;

  try {
    return await adminAuth.verifySessionCookie(session, true);
  } catch {
    return null;
  }
}
