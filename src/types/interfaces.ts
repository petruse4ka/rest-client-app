import { HttpMethod } from './types';

export interface RequestBody {
  method: HttpMethod;
  url: string;
}

export interface ApiResponse {
  data: unknown;
  status: number;
  statusText: string;
}
