export const runtime = 'nodejs';

import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { getServerUser } from '@/server/get-server-user';
import { HeaderApp } from '@/widgets';

export default async function ProtectedLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const userServer = await getServerUser();
  const user = { name: userServer?.name ?? null };

  return (
    <>
      <HeaderApp user={user} />
      {children}
    </>
  );
}
