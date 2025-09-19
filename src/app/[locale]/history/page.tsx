import { cookies } from 'next/headers';
import HistoryClientWrapper from './history-client-wrapper';
import { adminAuth } from '@/server/firebase-admin';
import { fetchRequestLogs } from '@/entities/request-log/model/fetch-request-logs';
import { getTranslations } from 'next-intl/server';

export default async function HistoryPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) {
    return null;
  }
  const decoded = await adminAuth.verifySessionCookie(token!, true);
  const uid = decoded.uid;

  const items = await fetchRequestLogs(uid);
  const t = await getTranslations('History');
  const loadingText = t('loading');

  return <HistoryClientWrapper items={items} loadingText={loadingText} />;
}
