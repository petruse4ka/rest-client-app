import { ERROR_MESSAGES } from '@/constants';

export default function getReadableErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  const message = error.message.toLowerCase();

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

  if (message.includes('network error') || message.includes('err_network')) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  if (message.includes('certificate') || message.includes('ssl') || message.includes('tls')) {
    return ERROR_MESSAGES.SSL_ERROR;
  }

  return error.message;
}
