import HistoryClientWrapper from './history-client-wrapper';
import { fetchRequestLogs } from '@/entities/request-log/model/fetch-request-logs';
import { getTranslations } from 'next-intl/server';
import { getServerUser } from '@/server/get-server-user';

export default async function HistoryPage() {
  const userServer = await getServerUser();
  const uid = userServer?.uid;
  if (!uid) {
    return null;
  }
  const items = await fetchRequestLogs(uid);
  const t = await getTranslations('History');
  const loadingText = t('loading');

  return (
    <>
      <HistoryClientWrapper items={items} loadingText={loadingText} />
    </>
  );
}
