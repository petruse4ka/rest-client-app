export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export interface RequestHistoryItem {
  id: string;
  url: string;
  method: HttpMethod;

  timestamp: string;
  durationMs: number;
  statusCode: number;

  requestSize: number;
  responseSize: number;

  errorDetails?: string;
}
