import getReadableErrorMessage from '../utils/get-readable-error-message';

describe('getReadableErrorMessage', () => {
  test('returns "Unknown error occurred" for non-Error objects', () => {
    expect(getReadableErrorMessage(null)).toBe('Unknown error occurred');
    expect(getReadableErrorMessage(undefined)).toBe('Unknown error occurred');
    expect(getReadableErrorMessage('string error')).toBe('Unknown error occurred');
    expect(getReadableErrorMessage(123)).toBe('Unknown error occurred');
    expect(getReadableErrorMessage({})).toBe('Unknown error occurred');
  });

  test('handles DNS errors with ENOTFOUND', () => {
    const error = new Error('getaddrinfo ENOTFOUND api.example.com');
    expect(getReadableErrorMessage(error)).toBe(
      'Unable to connect to the server. Please check the URL and try again.'
    );
  });

  test('handles DNS errors with getaddrinfo', () => {
    const error = new Error('getaddrinfo failed: Name or service not known');
    expect(getReadableErrorMessage(error)).toBe(
      'Unable to connect to the server. Please check the URL and try again.'
    );
  });

  test('handles connection refused errors', () => {
    const error = new Error('connect ECONNREFUSED api.example.com');
    expect(getReadableErrorMessage(error)).toBe(
      'Connection refused. The server may be down or the URL is incorrect.'
    );
  });

  test('handles connection refused with "connection refused" text', () => {
    const error = new Error('connection refused');
    expect(getReadableErrorMessage(error)).toBe(
      'Connection refused. The server may be down or the URL is incorrect.'
    );
  });

  test('handles timeout errors', () => {
    const error = new Error('timeout of 5000ms exceeded');
    expect(getReadableErrorMessage(error)).toBe(
      'Request timed out. The server took too long to respond.'
    );
  });

  test('handles timeout errors with ETIMEDOUT', () => {
    const error = new Error('ETIMEDOUT');
    expect(getReadableErrorMessage(error)).toBe(
      'Request timed out. The server took too long to respond.'
    );
  });

  test('handles CORS errors', () => {
    const error = new Error('CORS policy has blocked this request');
    expect(getReadableErrorMessage(error)).toBe(
      'CORS error. The server does not allow requests from this domain.'
    );
  });

  test('handles cross-origin errors', () => {
    const error = new Error('cross-origin request blocked');
    expect(getReadableErrorMessage(error)).toBe(
      'CORS error. The server does not allow requests from this domain.'
    );
  });

  test('handles network errors', () => {
    const error = new Error('Network Error');
    expect(getReadableErrorMessage(error)).toBe(
      'Network error. Please check your internet connection.'
    );
  });

  test('handles network errors with ERR_NETWORK', () => {
    const error = new Error('ERR_NETWORK');
    expect(getReadableErrorMessage(error)).toBe(
      'Network error. Please check your internet connection.'
    );
  });

  test('handles SSL certificate errors', () => {
    const error = new Error('certificate has expired');
    expect(getReadableErrorMessage(error)).toBe(
      "SSL/TLS error. There may be a problem with the server's security certificate."
    );
  });

  test('handles SSL errors', () => {
    const error = new Error('SSL handshake failed');
    expect(getReadableErrorMessage(error)).toBe(
      "SSL/TLS error. There may be a problem with the server's security certificate."
    );
  });

  test('handles TLS errors', () => {
    const error = new Error('TLS connection failed');
    expect(getReadableErrorMessage(error)).toBe(
      "SSL/TLS error. There may be a problem with the server's security certificate."
    );
  });

  test('returns original message for unrecognized errors', () => {
    const error = new Error('Custom error message');
    expect(getReadableErrorMessage(error)).toBe('Custom error message');
  });
});
