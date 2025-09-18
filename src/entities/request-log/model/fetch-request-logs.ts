import { QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';
import { FirestoreDoc, RequestHistoryItem } from '@/types/types';
import { db } from '@/server/firebase-admin';

function mapDoc(doc: QueryDocumentSnapshot<FirestoreDoc>): RequestHistoryItem {
  const data = doc.data();
  const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt;

  return {
    id: doc.id,
    url: data.url,
    appRouterURL: data.appRouterURL,
    method: data.method,
    statusCode: data.statusCode ?? 0,
    requestSize: data.requestSize ?? 0,
    responseSize: data.responseSize ?? 0,
    durationMs: data.durationMs ?? 0,
    errorDetails: data.errorDetails,
    timestamp: createdAt.toISOString(),
  };
}

export async function fetchRequestLogs(uid: string): Promise<RequestHistoryItem[]> {
  const snap = await db
    .collection('users')
    .doc(uid)
    .collection('requestLogs')
    .orderBy('createdAt', 'desc')
    .get();

  return snap.docs.map((d) => mapDoc(d as unknown as QueryDocumentSnapshot<FirestoreDoc>));
}
