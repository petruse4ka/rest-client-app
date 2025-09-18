import { RequestLogBase } from './interfaces';
import { type Timestamp } from 'firebase-admin/firestore';

export type ThemeValue = 'light' | 'dark';

export type ThemeContextType = {
  themeValue: ThemeValue;
  setThemeValue: (theme: ThemeValue) => void;
};

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}

export enum ContentType {
  JSON = 'json',
  TEXT = 'text',
  XML = 'xml',
}

export type VariablesData = {
  key: number;
  variable: string;
  value: string;
};

export type FirestoreDoc = RequestLogBase & {
  createdAt: Timestamp | Date;
};

export type RequestHistoryItem = RequestLogBase & {
  id: string;
  timestamp: string;
};

export type LogRequestPayload = RequestLogBase;
