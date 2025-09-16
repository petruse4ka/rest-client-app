import { validateJson } from '../utils';
import { ContentType } from '@/types/types';

describe('validateJson', () => {
  test('returns true for valid JSON string', () => {
    const testJson = '{"name": "Steve", "age": 50}';
    const result = validateJson(testJson, ContentType.JSON);
    expect(result).toBe(true);
  });

  test('returns true for valid JSON array', () => {
    const testArray = '[1, 2, 3, "test"]';
    const result = validateJson(testArray, ContentType.JSON);
    expect(result).toBe(true);
  });

  test('returns true for valid JSON with nested objects', () => {
    const testJson = '{"user": {"name": "Steve", "address": {"city": "New York"}}}';
    const result = validateJson(testJson, ContentType.JSON);
    expect(result).toBe(true);
  });

  test('returns false for invalid JSON string', () => {
    const testJson = '{"name": "Steve", "age": 50';
    const result = validateJson(testJson, ContentType.JSON);
    expect(result).toBe(false);
  });

  test('returns false for malformed JSON', () => {
    const testJson = '{name: "Steve"}';
    const result = validateJson(testJson, ContentType.JSON);
    expect(result).toBe(false);
  });

  test('returns true for empty string when content type is JSON', () => {
    const emptyString = '';
    const result = validateJson(emptyString, ContentType.JSON);
    expect(result).toBe(true);
  });

  test('returns true for empty string with non-JSON content type', () => {
    const emptyString = '';
    const result = validateJson(emptyString, ContentType.TEXT);
    expect(result).toBe(true);
  });
});
