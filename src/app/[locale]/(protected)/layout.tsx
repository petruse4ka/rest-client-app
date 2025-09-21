export const runtime = 'nodejs';

import type { ReactNode } from 'react';
import { getServerUser } from '@/server/get-server-user';
import { HeaderApp } from '@/widgets';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const userServer = await getServerUser();
  const user = { name: userServer?.name ?? null };

  return (
    <>
      <HeaderApp user={user} />
      {children}
    </>
  );
}
