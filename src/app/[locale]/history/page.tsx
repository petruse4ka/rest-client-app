import 'server-only';

import HistoryClientWrapper from '@/app/[locale]/history/history-client-wrapper';
import { fetchRequestLogs } from '@/entities/request-log/model/fetch-request-logs';
import { getTranslations } from 'next-intl/server';
import { getServerUser } from '@/server/get-server-user';
import { HeaderApp } from '@/widgets';

export default async function HistoryPage() {
  const userServer = await getServerUser();
  const user = userServer ? { name: userServer.name } : null;
  const uid = userServer?.uid;
  if (!uid) {
    return null;
  }
  const items = await fetchRequestLogs(uid);
  const t = await getTranslations('History');
  const loadingText = t('loading');

  return (
    <>
      <HeaderApp user={user} />
      <HistoryClientWrapper items={items} loadingText={loadingText} />
    </>
  );
}
