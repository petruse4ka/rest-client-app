'use client';

import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { updateProfile } from 'firebase/auth';
import { apiSignUp } from '@/shared/api/firebase/auth';

type Payload = { email: string; password: string; name?: string };

export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function mutate({ email, password, name }: Payload) {
    setLoading(true);
    setError(null);
    try {
      const cred = await apiSignUp({ email, password });
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
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
