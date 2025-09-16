'use client';

import { type ReactNode, createContext, useContext } from 'react';
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
  children: ReactNode;
}) {
  const value = { user: initialUser, isLogin: !!initialUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
