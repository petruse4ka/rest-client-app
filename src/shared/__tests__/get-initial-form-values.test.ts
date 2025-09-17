import { getInitialFormValues } from '../utils';
import { HttpMethod, ContentType } from '@/types/types';
import { DEFAULT_HEADERS } from '@/shared/constants';

describe('getInitialFormValues', () => {
  test('returns default values when urlParts is empty', () => {
    const urlParts: string[] = [];
    const searchParams = new URLSearchParams();

    const result = getInitialFormValues(urlParts, searchParams);

    expect(result).toEqual({
      method: HttpMethod.GET,
      url: '',
      headers: DEFAULT_HEADERS,
      data: '',
      contentType: ContentType.JSON,
    });
  });

  test('returns default values when urlParts has length 0', () => {
    const urlParts: string[] = [];
    const searchParams = new URLSearchParams();

    const result = getInitialFormValues(urlParts, searchParams);

    expect(result).toEqual({
      method: HttpMethod.GET,
      url: '',
      headers: DEFAULT_HEADERS,
      data: '',
      contentType: ContentType.JSON,
    });
  });

  test('decodes valid URL with method and URL only', () => {
    const testUrl = 'https://api.example.com/users';
    const base64Url = btoa(testUrl);
    const urlEncoded = encodeURIComponent(base64Url);

    const urlParts = ['GET', urlEncoded];
    const searchParams = new URLSearchParams();

    const result = getInitialFormValues(urlParts, searchParams);

    expect(result).toEqual({
      method: HttpMethod.GET,
      url: testUrl,
      headers: DEFAULT_HEADERS,
      data: '',
      contentType: ContentType.JSON,
    });
  });

  test('decodes valid URL with method, URL, and body', () => {
    const testUrl = 'https://api.example.com/users';
    const base64Url = btoa(testUrl);
    const urlEncoded = encodeURIComponent(base64Url);

    const jsonData = '{"name":"John","email":"john@example.com"}';
    const prettifiedJson = JSON.stringify(JSON.parse(jsonData), null, 2);
    const encodedBody = btoa(prettifiedJson);
    const bodyEncoded = encodeURIComponent(encodedBody);

    const urlParts = ['POST', urlEncoded, bodyEncoded];
    const searchParams = new URLSearchParams();

    const result = getInitialFormValues(urlParts, searchParams);

    expect(result.method).toBe(HttpMethod.POST);
    expect(result.url).toBe(testUrl);
    expect(result.headers).toEqual(DEFAULT_HEADERS);
    expect(result.data).toContain('"name": "John"');
    expect(result.data).toContain('"email": "john@example.com"');
    expect(result.contentType).toBe(ContentType.JSON);
  });

  test('decodes valid URL with headers from searchParams', () => {
    const testUrl = 'https://api.example.com/users';
    const base64Url = btoa(testUrl);
    const urlEncoded = encodeURIComponent(base64Url);

    const urlParts = ['PUT', urlEncoded];
    const searchParams = new URLSearchParams();
    searchParams.set('Authorization', 'Bearer token123');
    searchParams.set('Content-Type', 'application/json');

    const result = getInitialFormValues(urlParts, searchParams);

    expect(result.method).toBe(HttpMethod.PUT);
    expect(result.url).toBe(testUrl);
    expect(result.headers).toHaveLength(2);
    expect(result.headers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'Authorization', value: 'Bearer token123' }),
        expect.objectContaining({ key: 'Content-Type', value: 'application/json' }),
      ])
    );
    expect(result.data).toBe('');
    expect(result.contentType).toBe(ContentType.JSON);
  });

  test('decodes valid URL with both body and headers', () => {
    const testUrl = 'https://api.example.com/users/123';
    const base64Url = btoa(testUrl);
    const urlEncoded = encodeURIComponent(base64Url);

    const jsonData = '{"name":"Updated Name"}';
    const prettifiedJson = JSON.stringify(JSON.parse(jsonData), null, 2);
    const encodedBody = btoa(prettifiedJson);
    const bodyEncoded = encodeURIComponent(encodedBody);

    const urlParts = ['PATCH', urlEncoded, bodyEncoded];
    const searchParams = new URLSearchParams();
    searchParams.set('Authorization', 'Bearer token123');
    searchParams.set('X-Custom-Header', 'custom-value');

    const result = getInitialFormValues(urlParts, searchParams);

    expect(result.method).toBe(HttpMethod.PATCH);
    expect(result.url).toBe(testUrl);
    expect(result.headers).toHaveLength(2);
    expect(result.headers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'Authorization', value: 'Bearer token123' }),
        expect.objectContaining({ key: 'X-Custom-Header', value: 'custom-value' }),
      ])
    );
    expect(result.data).toContain('"name": "Updated Name"');
    expect(result.contentType).toBe(ContentType.JSON);
  });

  test('returns default values when decodeRestClientUrl returns null', () => {
    const urlParts = ['GET', 'invalid-base64'];
    const searchParams = new URLSearchParams();

    const result = getInitialFormValues(urlParts, searchParams);

    expect(result).toEqual({
      method: HttpMethod.GET,
      url: '',
      headers: DEFAULT_HEADERS,
      data: '',
      contentType: ContentType.JSON,
    });
  });

  test('filters out empty headers and uses default when no valid headers', () => {
    const testUrl = 'https://api.example.com/users';
    const base64Url = btoa(testUrl);
    const urlEncoded = encodeURIComponent(base64Url);

    const urlParts = ['GET', urlEncoded];
    const searchParams = new URLSearchParams();
    searchParams.set('', 'empty-key');
    searchParams.set('Empty-Value', '');

    const result = getInitialFormValues(urlParts, searchParams);

    expect(result.method).toBe(HttpMethod.GET);
    expect(result.url).toBe(testUrl);
    expect(result.headers).toEqual(DEFAULT_HEADERS);
    expect(result.data).toBe('');
    expect(result.contentType).toBe(ContentType.JSON);
  });
});
