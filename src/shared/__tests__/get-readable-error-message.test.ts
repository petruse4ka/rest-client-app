import { getReadableErrorMessage } from '../utils';
import { ERROR_MESSAGES } from '@/shared/constants';

describe('getReadableErrorMessage', () => {
  test('returns "Unknown error occurred" for non-Error objects', () => {
    expect(getReadableErrorMessage(null)).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
    expect(getReadableErrorMessage(undefined)).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
    expect(getReadableErrorMessage('string error')).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
    expect(getReadableErrorMessage(123)).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
    expect(getReadableErrorMessage({})).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
  });

  test('handles DNS errors with ENOTFOUND', () => {
    const error = new Error('getaddrinfo ENOTFOUND api.example.com');
    expect(getReadableErrorMessage(error)).toBe(ERROR_MESSAGES.DNS_ERROR);
  });

  test('handles DNS errors with getaddrinfo', () => {
    const error = new Error('getaddrinfo failed: Name or service not known');
    expect(getReadableErrorMessage(error)).toBe(ERROR_MESSAGES.DNS_ERROR);
  });

  test('handles connection refused errors', () => {
    const error = new Error('connect ECONNREFUSED api.example.com');
    expect(getReadableErrorMessage(error)).toBe(ERROR_MESSAGES.CONNECTION_REFUSED_ERROR);
  });

  test('handles connection refused with "connection refused" text', () => {
    const error = new Error('connection refused');
    expect(getReadableErrorMessage(error)).toBe(ERROR_MESSAGES.CONNECTION_REFUSED_ERROR);
  });

  test('handles timeout errors', () => {
    const error = new Error('timeout of 5000ms exceeded');
    expect(getReadableErrorMessage(error)).toBe(ERROR_MESSAGES.TIMEOUT_ERROR);
  });

  test('handles timeout errors with ETIMEDOUT', () => {
    const error = new Error('ETIMEDOUT');
    expect(getReadableErrorMessage(error)).toBe(ERROR_MESSAGES.TIMEOUT_ERROR);
  });

  test('handles CORS errors', () => {
    const error = new Error('CORS policy has blocked this request');
    expect(getReadableErrorMessage(error)).toBe(ERROR_MESSAGES.CORS_ERROR);
  });

  test('handles cross-origin errors', () => {
    const error = new Error('cross-origin request blocked');
    expect(getReadableErrorMessage(error)).toBe(ERROR_MESSAGES.CORS_ERROR);
  });

  test('handles network errors', () => {
    const error = new Error('Network Error');
    expect(getReadableErrorMessage(error)).toBe(ERROR_MESSAGES.NETWORK_ERROR);
  });

  test('handles network errors with ERR_NETWORK', () => {
    const error = new Error('ERR_NETWORK');
    expect(getReadableErrorMessage(error)).toBe(ERROR_MESSAGES.NETWORK_ERROR);
  });

  test('handles SSL certificate errors', () => {
    const error = new Error('certificate has expired');
    expect(getReadableErrorMessage(error)).toBe(ERROR_MESSAGES.SSL_ERROR);
  });

  test('handles SSL errors', () => {
    const error = new Error('SSL handshake failed');
    expect(getReadableErrorMessage(error)).toBe(ERROR_MESSAGES.SSL_ERROR);
  });

  test('handles TLS errors', () => {
    const error = new Error('TLS connection failed');
    expect(getReadableErrorMessage(error)).toBe(ERROR_MESSAGES.SSL_ERROR);
  });

  test('returns original message for unrecognized errors', () => {
    const error = new Error('Custom error message');
    expect(getReadableErrorMessage(error)).toBe('Custom error message');
  });
});
