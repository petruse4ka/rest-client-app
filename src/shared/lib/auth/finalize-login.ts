'use client';
import { getIdToken } from 'firebase/auth';
import { auth } from '@/shared/config/firebase';

export async function finalizeLogin() {
  const idToken = await getIdToken(auth.currentUser!, true);
  await fetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
}
