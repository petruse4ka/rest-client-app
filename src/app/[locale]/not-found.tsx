import '@ant-design/v5-patch-for-react-19';
import { HeaderApp, NotFoundWidget } from '@/widgets';
import { getServerUser } from '@/server/get-server-user';

export default async function NotFound() {
  const userServer = await getServerUser();
  const user = userServer ? { name: userServer.name } : null;
  return (
    <>
      <HeaderApp user={user} />
      <NotFoundWidget />
    </>
  );
}
