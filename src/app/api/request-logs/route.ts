import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/server/firebase-admin';
import { saveRequestLog } from '@/entities/request-log/model/save-request-log';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('session')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifySessionCookie(token, true);
    const uid = decoded.uid;

    const body = await req.json();
    const {
      method,
      url,
      appRouterURL,
      statusCode,
      requestSize,
      responseSize,
      durationMs,
      errorDetails,
    } = body ?? {};

    if (!url || !appRouterURL || !method) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await saveRequestLog({
      uid,
      method,
      url,
      appRouterURL,
      statusCode: Number(statusCode) || 0,
      requestSize: Number(requestSize) || 0,
      responseSize: Number(responseSize) || 0,
      durationMs: Number(durationMs) || 0,
      errorDetails: String(errorDetails),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
