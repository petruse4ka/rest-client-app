import axios from 'axios';
import type { RequestBody, ApiResponse } from '@/types/interfaces';
import { measureDuration } from '@/shared/utils';

export async function executeRestClientRequest(requestData: RequestBody): Promise<{
  response: { data: ApiResponse };
  durationMs: number;
}> {
  return measureDuration(() => axios.post('/api/rest-client', requestData));
}
