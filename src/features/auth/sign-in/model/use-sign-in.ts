'use client';

import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { apiSignIn } from '@/shared/api/firebase/auth';

type Payload = { email: string; password: string };

export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function mutate({ email, password }: Payload) {
    setLoading(true);
    setError(null);
    try {
      const cred = await apiSignIn({ email, password });
      return cred.user;
    } catch (e) {
      const code = e instanceof FirebaseError ? e.code : undefined;
      setError(code ?? 'unknown');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { mutate, loading, error };
}
