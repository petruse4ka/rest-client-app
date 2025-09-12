'use client';

import { createContext, useContext, useMemo } from 'react';
import type { DecodedIdToken } from 'firebase-admin/auth';

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
  const value = useMemo(() => ({ user: initialUser, isLogin: !!initialUser }), [initialUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
