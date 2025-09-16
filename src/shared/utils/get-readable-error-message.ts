import { ERROR_MESSAGES } from '@/shared/constants';

export function getReadableErrorMessage(error: unknown): string {
  let message: string;

  if (error instanceof Error) {
    message = error.message.toLowerCase();
  } else if (typeof error === 'string') {
    message = error.toLowerCase();
  } else {
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  if (message.includes('enotfound') || message.includes('getaddrinfo')) {
    return ERROR_MESSAGES.DNS_ERROR;
  }

  if (message.includes('econnrefused') || message.includes('connection refused')) {
    return ERROR_MESSAGES.CONNECTION_REFUSED_ERROR;
  }

  if (message.includes('timeout') || message.includes('etimedout')) {
    return ERROR_MESSAGES.TIMEOUT_ERROR;
  }

  if (message.includes('cors') || message.includes('cross-origin')) {
    return ERROR_MESSAGES.CORS_ERROR;
  }

  if (
    message.includes('network error') ||
    message.includes('err_network') ||
    message.includes('internet_disconnected')
  ) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  if (message.includes('certificate') || message.includes('ssl') || message.includes('tls')) {
    return ERROR_MESSAGES.SSL_ERROR;
  }

  return message;
}
