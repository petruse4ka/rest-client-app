import 'server-only';

import { getServerUser } from '@/server/get-server-user';
import RestClientPageDefault from './[...params]/page';
import { HeaderApp } from '@/widgets';

export default async function RestClientPage() {
  const userServer = await getServerUser();
  const user = userServer ? { name: userServer.name } : null;
  return (
    <>
      <HeaderApp user={user} />
      <RestClientPageDefault />;
    </>
  );
}
