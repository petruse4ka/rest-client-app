export default function getReadableErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'Unknown error occurred';
  }

  const message = error.message.toLowerCase();

  if (message.includes('enotfound') || message.includes('getaddrinfo')) {
    return 'Unable to connect to the server. Please check the URL and try again.';
  }

  if (message.includes('econnrefused') || message.includes('connection refused')) {
    return 'Connection refused. The server may be down or the URL is incorrect.';
  }

  if (message.includes('timeout') || message.includes('etimedout')) {
    return 'Request timed out. The server took too long to respond.';
  }

  if (message.includes('cors') || message.includes('cross-origin')) {
    return 'CORS error. The server does not allow requests from this domain.';
  }

  if (message.includes('network error') || message.includes('err_network')) {
    return 'Network error. Please check your internet connection.';
  }

  if (message.includes('certificate') || message.includes('ssl') || message.includes('tls')) {
    return "SSL/TLS error. There may be a problem with the server's security certificate.";
  }

  return error.message;
}
