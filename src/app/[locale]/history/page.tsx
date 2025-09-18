import { cookies } from 'next/headers';
import HistoryView from './history-client';
import { adminAuth } from '@/server/firebase-admin';
import { fetchRequestLogs } from '@/entities/request-log/model/fetch-request-logs';

export default async function HistoryPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) {
    return null;
  }
  const decoded = await adminAuth.verifySessionCookie(token!, true);
  const uid = decoded.uid;

  const items = await fetchRequestLogs(uid);

  return <HistoryView items={items} />;
}
