import { db } from '@/server/firebase-admin';
import { HttpMethod } from '@/types/types';

export async function saveRequestLog(params: {
  uid: string;
  url: string;
  method: HttpMethod;
  statusCode: number;
  requestSize: number;
  responseSize: number;
  durationMs: number;
  errorDetails: string;
}) {
  const { uid, ...rest } = params;

  const clean = Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined));

  await db
    .collection('users')
    .doc(uid)
    .collection('requestLogs')
    .add({
      ...clean,
      createdAt: new Date(),
    });
}
