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
  const { locale } = await params;
  const userServer = await getServerUser();
  if (!userServer) redirect(`/${locale}/`);

  const user = { name: userServer.name ?? null };

  return (
    <>
      <HeaderApp user={user} />
      {children}
    </>
  );
}
