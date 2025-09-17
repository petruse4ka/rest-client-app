import { HttpMethod, ContentType } from './types';
import { type Timestamp } from 'firebase-admin/firestore';

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

export interface RequestHistoryItem {
  id: string;
  url: string;
  method: HttpMethod;
  timestamp: string;
  durationMs: number;
  statusCode: number;
  requestSize: number;
  responseSize: number;
  errorDetails: string;
}

export type FirestoreDoc = {
  url: string;
  method: HttpMethod;
  createdAt: Timestamp | Date;
  statusCode: number;
  requestSize: number;
  responseSize: number;
  durationMs: number;
  errorDetails: string;
};
