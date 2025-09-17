import { encodeRestClientUrl } from '../utils';
import { HttpMethod, ContentType } from '@/types/types';

describe('encodeRestClientUrl', () => {
  test('encodes basic GET request without headers or data', () => {
    const formData = {
      method: HttpMethod.GET,
      url: 'https://api.example.com/users',
      headers: {},
      data: '',
      contentType: ContentType.JSON,
    };

    const result = encodeRestClientUrl(formData);
    const urlParts = result.split('/');

    expect(urlParts).toHaveLength(4);
    expect(urlParts[0]).toBe('');
    expect(urlParts[1]).toBe('rest-client');
    expect(urlParts[2]).toBe('GET');

    const decodedUrl = atob(decodeURIComponent(urlParts[3]));
    expect(decodedUrl).toBe('https://api.example.com/users');

    expect(result).not.toContain('?');
  });

  test('encodes POST request with data', () => {
    const formData = {
      method: HttpMethod.POST,
      url: 'https://api.example.com/users',
      headers: {},
      data: '{"name":"John","email":"john@example.com"}',
      contentType: ContentType.JSON,
    };

    const result = encodeRestClientUrl(formData);
    const urlParts = result.split('/');

    expect(urlParts).toHaveLength(5);
    expect(urlParts[0]).toBe('');
    expect(urlParts[1]).toBe('rest-client');
    expect(urlParts[2]).toBe('POST');

    const decodedUrl = atob(decodeURIComponent(urlParts[3]));
    expect(decodedUrl).toBe('https://api.example.com/users');

    const decodedBody = atob(decodeURIComponent(urlParts[4]));
    expect(decodedBody).toContain('"name": "John"');
    expect(decodedBody).toContain('"email": "john@example.com"');

    expect(result).not.toContain('?');
  });

  test('encodes request with headers as query parameters', () => {
    const formData = {
      method: HttpMethod.GET,
      url: 'https://api.example.com/users',
      headers: {
        Authorization: 'Bearer token123',
        'Content-Type': 'application/json',
        'X-Custom-Header': 'custom-value',
      },
      data: '',
      contentType: ContentType.JSON,
    };

    const result = encodeRestClientUrl(formData);
    const [pathPart, queryPart] = result.split('?');
    const urlParts = pathPart.split('/');

    expect(urlParts).toHaveLength(4);
    expect(urlParts[0]).toBe('');
    expect(urlParts[1]).toBe('rest-client');
    expect(urlParts[2]).toBe('GET');

    const decodedUrl = atob(decodeURIComponent(urlParts[3]));
    expect(decodedUrl).toBe('https://api.example.com/users');

    expect(queryPart).toBeDefined();
    expect(queryPart).toContain('Authorization=Bearer+token123');
    expect(queryPart).toContain('Content-Type=application%2Fjson');
    expect(queryPart).toContain('X-Custom-Header=custom-value');
  });

  test('encodes request with both data and headers', () => {
    const formData = {
      method: HttpMethod.PUT,
      url: 'https://api.example.com/users/123',
      headers: {
        Authorization: 'Bearer token123',
        'Content-Type': 'application/json',
      },
      data: '{"name":"Updated Name"}',
      contentType: ContentType.JSON,
    };

    const result = encodeRestClientUrl(formData);
    const [pathPart, queryPart] = result.split('?');
    const urlParts = pathPart.split('/');

    expect(urlParts).toHaveLength(5);
    expect(urlParts[0]).toBe('');
    expect(urlParts[1]).toBe('rest-client');
    expect(urlParts[2]).toBe('PUT');

    const decodedUrl = atob(decodeURIComponent(urlParts[3]));
    expect(decodedUrl).toBe('https://api.example.com/users/123');

    const decodedBody = atob(decodeURIComponent(urlParts[4]));
    expect(decodedBody).toContain('"name": "Updated Name"');

    expect(queryPart).toBeDefined();
    expect(queryPart).toContain('Authorization=Bearer+token123');
    expect(queryPart).toContain('Content-Type=application%2Fjson');
  });

  test('handles empty headers object', () => {
    const formData = {
      method: HttpMethod.GET,
      url: 'https://api.example.com/users',
      headers: {},
      data: '',
      contentType: ContentType.JSON,
    };

    const result = encodeRestClientUrl(formData);
    const urlParts = result.split('/');

    expect(urlParts).toHaveLength(4);
    expect(urlParts[0]).toBe('');
    expect(urlParts[1]).toBe('rest-client');
    expect(urlParts[2]).toBe('GET');

    const decodedUrl = atob(decodeURIComponent(urlParts[3]));
    expect(decodedUrl).toBe('https://api.example.com/users');

    expect(result).not.toContain('?');
  });

  test('filters out headers with empty keys or values', () => {
    const formData = {
      method: HttpMethod.GET,
      url: 'https://api.example.com/users',
      headers: {
        'Valid-Header': 'valid-value',
        '': 'empty-key',
        'Empty-Value': '',
        '   ': 'whitespace-key',
        'Whitespace-Value': '   ',
        'Another-Valid': 'another-value',
      },
      data: '',
      contentType: ContentType.JSON,
    };

    const result = encodeRestClientUrl(formData);
    const [pathPart, queryPart] = result.split('?');
    const urlParts = pathPart.split('/');

    expect(urlParts).toHaveLength(4);
    expect(urlParts[0]).toBe('');
    expect(urlParts[1]).toBe('rest-client');
    expect(urlParts[2]).toBe('GET');

    const decodedUrl = atob(decodeURIComponent(urlParts[3]));
    expect(decodedUrl).toBe('https://api.example.com/users');

    expect(queryPart).toBeDefined();
    expect(queryPart).toContain('Valid-Header=valid-value');
    expect(queryPart).toContain('Another-Valid=another-value');
    expect(queryPart).not.toContain('empty-key');
    expect(queryPart).not.toContain('Empty-Value');
    expect(queryPart).not.toContain('whitespace-key');
    expect(queryPart).not.toContain('Whitespace-Value');
  });

  test('trims whitespace from header keys and values', () => {
    const formData = {
      method: HttpMethod.GET,
      url: 'https://api.example.com/users',
      headers: {
        '  Authorization  ': '  Bearer token123  ',
        '  Content-Type  ': '  application/json  ',
      },
      data: '',
      contentType: ContentType.JSON,
    };

    const result = encodeRestClientUrl(formData);
    const [pathPart, queryPart] = result.split('?');
    const urlParts = pathPart.split('/');

    expect(urlParts).toHaveLength(4);
    expect(urlParts[0]).toBe('');
    expect(urlParts[1]).toBe('rest-client');
    expect(urlParts[2]).toBe('GET');

    const decodedUrl = atob(decodeURIComponent(urlParts[3]));
    expect(decodedUrl).toBe('https://api.example.com/users');

    expect(queryPart).toBeDefined();
    expect(queryPart).toContain('Authorization=Bearer+token123');
    expect(queryPart).toContain('Content-Type=application%2Fjson');
  });

  test('handles empty data string', () => {
    const formData = {
      method: HttpMethod.POST,
      url: 'https://api.example.com/users',
      headers: {},
      data: '',
      contentType: ContentType.JSON,
    };

    const result = encodeRestClientUrl(formData);
    const urlParts = result.split('/');

    expect(urlParts).toHaveLength(4);
    expect(urlParts[0]).toBe('');
    expect(urlParts[1]).toBe('rest-client');
    expect(urlParts[2]).toBe('POST');

    const decodedUrl = atob(decodeURIComponent(urlParts[3]));
    expect(decodedUrl).toBe('https://api.example.com/users');

    expect(result).not.toContain('?');
  });

  test('handles undefined data', () => {
    const formData = {
      method: HttpMethod.POST,
      url: 'https://api.example.com/users',
      headers: {},
      data: undefined,
      contentType: ContentType.JSON,
    };

    const result = encodeRestClientUrl(formData);
    const urlParts = result.split('/');

    expect(urlParts).toHaveLength(4);
    expect(urlParts[0]).toBe('');
    expect(urlParts[1]).toBe('rest-client');
    expect(urlParts[2]).toBe('POST');

    const decodedUrl = atob(decodeURIComponent(urlParts[3]));
    expect(decodedUrl).toBe('https://api.example.com/users');

    expect(result).not.toContain('?');
  });

  test('handles special characters in URL', () => {
    const formData = {
      method: HttpMethod.GET,
      url: 'https://api.example.com/search?q=test&category=all',
      headers: {},
      data: '',
      contentType: ContentType.JSON,
    };

    const result = encodeRestClientUrl(formData);
    const urlParts = result.split('/');

    expect(urlParts).toHaveLength(4);
    expect(urlParts[0]).toBe('');
    expect(urlParts[1]).toBe('rest-client');
    expect(urlParts[2]).toBe('GET');

    const decodedUrl = atob(decodeURIComponent(urlParts[3]));
    expect(decodedUrl).toBe('https://api.example.com/search?q=test&category=all');

    expect(result).not.toContain('?');
  });

  test('handles special characters in headers', () => {
    const formData = {
      method: HttpMethod.GET,
      url: 'https://api.example.com/users',
      headers: {
        'X-Special-Header': 'value with spaces & symbols!',
        Authorization: 'Bearer token with spaces',
      },
      data: '',
      contentType: ContentType.JSON,
    };

    const result = encodeRestClientUrl(formData);
    const [pathPart, queryPart] = result.split('?');
    const urlParts = pathPart.split('/');

    expect(urlParts).toHaveLength(4);
    expect(urlParts[0]).toBe('');
    expect(urlParts[1]).toBe('rest-client');
    expect(urlParts[2]).toBe('GET');

    const decodedUrl = atob(decodeURIComponent(urlParts[3]));
    expect(decodedUrl).toBe('https://api.example.com/users');

    expect(queryPart).toBeDefined();
    expect(queryPart).toContain('X-Special-Header=value+with+spaces+%26+symbols%21');
    expect(queryPart).toContain('Authorization=Bearer+token+with+spaces');
  });

  test('handles special characters in data', () => {
    const formData = {
      method: HttpMethod.POST,
      url: 'https://api.example.com/users',
      headers: {},
      data: '{"message":"Hello, World! & Special chars: @#$%"}',
      contentType: ContentType.JSON,
    };

    const result = encodeRestClientUrl(formData);
    const urlParts = result.split('/');

    expect(urlParts).toHaveLength(5);
    expect(urlParts[0]).toBe('');
    expect(urlParts[1]).toBe('rest-client');
    expect(urlParts[2]).toBe('POST');

    const decodedUrl = atob(decodeURIComponent(urlParts[3]));
    expect(decodedUrl).toBe('https://api.example.com/users');

    const decodedBody = atob(decodeURIComponent(urlParts[4]));
    expect(decodedBody).toContain('"message": "Hello, World! & Special chars: @#$%"');

    expect(result).not.toContain('?');
  });
});
