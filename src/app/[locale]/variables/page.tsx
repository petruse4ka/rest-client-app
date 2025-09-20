import 'server-only';
import '@ant-design/v5-patch-for-react-19';

import { HeaderApp } from '@/widgets';
import { VariablesView } from './variables-client';
import { getServerUser } from '@/server/get-server-user';

export default async function VariablesPage() {
  const userServer = await getServerUser();
  const user = userServer ? { name: userServer.name } : null;

  return (
    <>
      <HeaderApp user={user} />
      <VariablesView />
    </>
  );
}
