import { HttpMethod, ContentType } from './types';

export interface Header {
  key: string;
  value: string;
  id?: number;
}

export interface RequestBody {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  data?: string;
  contentType?: ContentType;
}

export interface ApiResponse {
  data?: unknown;
  status?: number;
  statusText?: string;
  error?: string;
}

export interface DecodedUrlData {
  method: HttpMethod;
  url: string;
  body?: string;
  headers?: Header[];
}

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
