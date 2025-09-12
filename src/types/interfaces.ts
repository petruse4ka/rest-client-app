import { HttpMethod } from './types';

export interface RequestBody {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  data?: string;
}

export interface ApiResponse {
  data?: unknown;
  status?: number;
  statusText?: string;
  error?: string;
}

export interface LanguageItem {
  key: string;
  label: string;
  syntax_mode: string;
  variants: { key: string }[];
}
