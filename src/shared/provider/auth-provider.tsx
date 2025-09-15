'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { CHECK_TOKEN_SHORT } from '../config/auth';
import { useRouter } from '@/shared/i18n/navigation';
import axios from 'axios';
import { appRoutes } from '../config/navigation';

type AuthCtx = {
  user: Pick<DecodedIdToken, 'name'> | null;
  isLogin: boolean;
};

const AuthContext = createContext<AuthCtx>({ user: null, isLogin: false });

export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: AuthCtx['user'];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }

    if (initialUser) {
      interval.current = setInterval(async () => {
        try {
          await axios.post('/api/auth/verify');
        } catch (e) {
          await axios.post('/api/logout');
          router.push(appRoutes.home);
          router.refresh();
          clearInterval(interval.current!);
          interval.current = null;
        }
      }, 1000);
    }

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [initialUser]);

  const value = { user: initialUser, isLogin: !!initialUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
