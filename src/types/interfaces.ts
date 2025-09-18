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

export interface LanguageItem {
  key: string;
  label: string;
  syntax_mode: string;
  variants: { key: string }[];
}

export interface RequestLogBase {
  url: string;
  appRouterURL: string;
  method: HttpMethod;
  statusCode: number;
  requestSize: number;
  responseSize: number;
  durationMs: number;
  errorDetails: string;
}

export interface ErrorTexts {
  title: string;
  message: string;
  buttonText: string;
}
