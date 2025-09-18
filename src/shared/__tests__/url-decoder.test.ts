import { decodeRestClientUrl } from '../utils';
import { HttpMethod } from '@/types/types';

describe('decodeRestClientUrl', () => {
  test('decodes basic GET request without headers or data', () => {
    const urlParts = ['GET', 'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnM%3D'];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.method).toBe(HttpMethod.GET);
    expect(result?.url).toBe('https://api.example.com/users');
    expect(result?.body).toBeUndefined();
    expect(result?.headers).toEqual([]);
  });

  test('decodes POST request with data', () => {
    const jsonData = '{"name":"John","email":"john@example.com"}';
    const prettifiedJson = JSON.stringify(JSON.parse(jsonData), null, 2);
    const encodedBody = btoa(prettifiedJson);
    const bodyEncoded = encodeURIComponent(encodedBody);

    const urlParts = ['POST', 'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnM%3D', bodyEncoded];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.method).toBe(HttpMethod.POST);
    expect(result?.url).toBe('https://api.example.com/users');
    expect(result?.body).toContain('"name": "John"');
    expect(result?.body).toContain('"email": "john@example.com"');
    expect(result?.headers).toEqual([]);
  });

  test('decodes request with headers from query parameters', () => {
    const urlParts = ['GET', 'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnM%3D'];
    const searchParams = new URLSearchParams();
    searchParams.set('Authorization', 'Bearer token123');
    searchParams.set('Content-Type', 'application/json');
    searchParams.set('X-Custom-Header', 'custom-value');

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.method).toBe(HttpMethod.GET);
    expect(result?.url).toBe('https://api.example.com/users');
    expect(result?.body).toBeUndefined();
    expect(result?.headers).toHaveLength(3);
    expect(result?.headers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'Authorization', value: 'Bearer token123' }),
        expect.objectContaining({ key: 'Content-Type', value: 'application/json' }),
        expect.objectContaining({ key: 'X-Custom-Header', value: 'custom-value' }),
      ])
    );
  });

  test('decodes request with both data and headers', () => {
    const jsonData = '{"name":"Updated Name"}';
    const prettifiedJson = JSON.stringify(JSON.parse(jsonData), null, 2);
    const encodedBody = btoa(prettifiedJson);
    const bodyEncoded = encodeURIComponent(encodedBody);

    const testUrl = 'https://api.example.com/users/123';
    const base64Url = btoa(testUrl);
    const urlEncoded = encodeURIComponent(base64Url);

    const urlParts = ['PUT', urlEncoded, bodyEncoded];
    const searchParams = new URLSearchParams();
    searchParams.set('Authorization', 'Bearer token123');
    searchParams.set('Content-Type', 'application/json');

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.method).toBe(HttpMethod.PUT);
    expect(result?.url).toBe('https://api.example.com/users/123');
    expect(result?.body).toContain('"name": "Updated Name"');
    expect(result?.headers).toHaveLength(2);
    expect(result?.headers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'Authorization', value: 'Bearer token123' }),
        expect.objectContaining({ key: 'Content-Type', value: 'application/json' }),
      ])
    );
  });

  test('handles empty urlParts array', () => {
    const urlParts: string[] = [];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).toBeNull();
  });

  test('handles urlParts with only method', () => {
    const urlParts = ['GET'];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.method).toBe(HttpMethod.GET);
    expect(result?.url).toBe('');
    expect(result?.body).toBeUndefined();
    expect(result?.headers).toEqual([]);
  });

  test('handles urlParts with method and empty URL', () => {
    const urlParts = ['POST', ''];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.method).toBe(HttpMethod.POST);
    expect(result?.url).toBe('');
    expect(result?.body).toBeUndefined();
    expect(result?.headers).toEqual([]);
  });

  test('handles empty searchParams', () => {
    const urlParts = ['GET', 'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnM%3D'];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.headers).toEqual([]);
  });

  test('filters out headers with empty keys or values', () => {
    const urlParts = ['GET', 'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnM%3D'];
    const searchParams = new URLSearchParams();
    searchParams.set('Valid-Header', 'valid-value');
    searchParams.set('', 'empty-key');
    searchParams.set('Empty-Value', '');
    searchParams.set('Another-Valid', 'another-value');

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.headers).toHaveLength(2);
    expect(result?.headers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'Valid-Header', value: 'valid-value' }),
        expect.objectContaining({ key: 'Another-Valid', value: 'another-value' }),
      ])
    );
    expect(result?.headers).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: '', value: 'empty-key' }),
        expect.objectContaining({ key: 'Empty-Value', value: '' }),
      ])
    );
  });

  test('handles special characters in URL', () => {
    const urlParts = [
      'GET',
      'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vc2VhcmNoP3E9dGVzdCZjYXRlZ29yeT1hbGw%3D',
    ];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.url).toBe('https://api.example.com/search?q=test&category=all');
  });

  test('handles special characters in headers', () => {
    const urlParts = ['GET', 'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnM%3D'];
    const searchParams = new URLSearchParams();
    searchParams.set('X-Special-Header', 'value with spaces & symbols!');
    searchParams.set('Authorization', 'Bearer token with spaces');

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.headers).toHaveLength(2);
    expect(result?.headers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'X-Special-Header', value: 'value with spaces & symbols!' }),
        expect.objectContaining({ key: 'Authorization', value: 'Bearer token with spaces' }),
      ])
    );
  });

  test('handles special characters in data', () => {
    const jsonData = '{"message":"Hello, World! & Special chars: @#$%"}';
    const prettifiedJson = JSON.stringify(JSON.parse(jsonData), null, 2);
    const encodedBody = btoa(prettifiedJson);
    const bodyEncoded = encodeURIComponent(encodedBody);

    const urlParts = ['POST', 'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnM%3D', bodyEncoded];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.body).toContain('"message": "Hello, World! & Special chars: @#$%"');
  });

  test('handles malformed base64 URL', () => {
    const urlParts = ['GET', 'invalid-base64'];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).toBeNull();
  });

  test('handles malformed base64 body', () => {
    const urlParts = ['POST', 'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnM%3D', 'invalid-base64'];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).toBeNull();
  });

  test('handles malformed URL encoding', () => {
    const urlParts = ['GET', 'invalid%url%encoding'];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).toBeNull();
  });

  test('handles malformed body encoding', () => {
    const urlParts = [
      'POST',
      'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnM%3D',
      'invalid%body%encoding',
    ];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).toBeNull();
  });

  test('generates unique IDs for headers', () => {
    const urlParts = ['GET', 'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnM%3D'];
    const searchParams = new URLSearchParams();
    searchParams.set('Header1', 'value1');
    searchParams.set('Header2', 'value2');

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.headers).toHaveLength(2);

    const ids = result?.headers.map((h) => h.id);
    expect(ids).toHaveLength(2);
    expect(ids?.[0]).not.toBe(ids?.[1]);
    expect(ids?.[0]).toBeTypeOf('number');
    expect(ids?.[1]).toBeTypeOf('number');
  });

  test('handles empty body', () => {
    const urlParts = ['POST', 'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnM%3D', ''];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.body).toBeUndefined();
  });

  test('handles whitespace-only body', () => {
    const whitespaceBody = '   ';
    const encodedBody = btoa(whitespaceBody);
    const bodyEncoded = encodeURIComponent(encodedBody);
    const urlParts = ['POST', 'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnM%3D', bodyEncoded];
    const searchParams = new URLSearchParams();

    const result = decodeRestClientUrl(urlParts, searchParams);

    expect(result).not.toBeNull();
    expect(result?.body).toBe(whitespaceBody);
  });
});
