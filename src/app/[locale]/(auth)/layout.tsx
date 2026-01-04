import { ReactNode } from 'react';

import { getServerUser } from '@/server/get-server-user';
import { HeaderApp } from '@/widgets';

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const userServer = await getServerUser();
  const user = userServer ? { name: userServer.name ?? null } : null;

  return (
    <>
      <HeaderApp user={user} />
      {children}
    </>
  );
}
