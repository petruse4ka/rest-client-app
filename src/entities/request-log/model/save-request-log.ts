import { db } from '@/server/firebase-admin';
import { LogRequestPayload } from '@/types/types';

export async function saveRequestLog(params: { uid: string } & LogRequestPayload) {
  const { uid, ...rest } = params;

  await db
    .collection('users')
    .doc(uid)
    .collection('requestLogs')
    .add({
      ...rest,
      createdAt: new Date(),
    });
}
