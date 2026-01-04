import axios from 'axios';
import type { HttpMethod } from '@/types/types';

export interface RequestLogData {
  url: string;
  appRouterURL: string;
  method: HttpMethod;
  requestSize: number;
  responseSize: number;
  durationMs: number;
  statusCode?: number;
  errorDetails: string;
}

export async function saveRequestLog(logData: RequestLogData): Promise<void> {
  await axios.post('/api/request-logs', logData);
}
