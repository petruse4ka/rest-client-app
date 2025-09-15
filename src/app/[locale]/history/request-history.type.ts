//TODO : delete this file after fetch data
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export interface RequestHistoryItem {
  id: string;
  url: string; // Endpoint/URL
  method: HttpMethod; // HTTP метод

  timestamp: string; // ISO-строка времени запроса
  durationMs: number; // Request Duration (Latency) в миллисекундах
  statusCode: number; // Response Status Code

  requestSize: number; // размер запроса в байтах
  responseSize: number; // размер ответа в байтах

  errorDetails?: string; // описание ошибки (если была)
}
