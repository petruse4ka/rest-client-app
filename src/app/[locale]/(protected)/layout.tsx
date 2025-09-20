export const runtime = 'nodejs';

import { redirect } from 'next/navigation';
import { getServerUser } from '@/server/get-server-user';
import type { ReactNode } from 'react';

import { HeaderApp } from '@/widgets';

export default async function ProtectedLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const userServer = await getServerUser();
  if (!userServer) redirect(`/${params.locale}/sign-in`);

  const user = { name: userServer.name ?? null };

  return (
    <>
      <HeaderApp user={user} />
      {children}
    </>
  );
}
