import { getServerUser } from '@/server/get-server-user';

import HistoryView from './history-client';

export default async function HistoryPage() {
  const user = await getServerUser();
  return <HistoryView user={user} />;
}
