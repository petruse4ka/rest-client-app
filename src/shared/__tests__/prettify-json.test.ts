import { prettifyJson } from '../utils';
import { ContentType } from '@/types/types';

describe('prettifyJson', () => {
  test('prettifies valid JSON string', () => {
    const testJson = '{"name":"Steve","age":50}';
    const expected = '{\n  "name": "Steve",\n  "age": 50\n}';
    const result = prettifyJson(testJson, ContentType.JSON);
    expect(result).toBe(expected);
  });

  test('prettifies valid JSON array', () => {
    const testArray = '[1,2,3,"test"]';
    const expected = '[\n  1,\n  2,\n  3,\n  "test"\n]';
    const result = prettifyJson(testArray, ContentType.JSON);
    expect(result).toBe(expected);
  });

  test('prettifies JSON with nested objects', () => {
    const testJson = '{"user":{"name":"Steve","address":{"city":"New York"}}}';
    const expected =
      '{\n  "user": {\n    "name": "Steve",\n    "address": {\n      "city": "New York"\n    }\n  }\n}';
    const result = prettifyJson(testJson, ContentType.JSON);
    expect(result).toBe(expected);
  });

  test('returns null for invalid JSON string', () => {
    const testJson = '{"name":"Steve","age":50';
    const result = prettifyJson(testJson, ContentType.JSON);
    expect(result).toBeNull();
  });

  test('returns null for malformed JSON', () => {
    const testJson = '{name:"Steve"}';
    const result = prettifyJson(testJson, ContentType.JSON);
    expect(result).toBeNull();
  });

  test('returns original value for empty string when content type is JSON', () => {
    const emptyString = '';
    const result = prettifyJson(emptyString, ContentType.JSON);
    expect(result).toBe(emptyString);
  });

  test('returns original value for any string when content type is TEXT', () => {
    const anyString = 'Any string';
    const result = prettifyJson(anyString, ContentType.TEXT);
    expect(result).toBe(anyString);
  });

  test('returns original value for any string when content type is XML', () => {
    const anyString = 'Any string';
    const result = prettifyJson(anyString, ContentType.XML);
    expect(result).toBe(anyString);
  });

  test('handles already prettified JSON', () => {
    const testJson = '{\n  "name": "Steve",\n  "age": 50\n}';
    const expected = '{\n  "name": "Steve",\n  "age": 50\n}';
    const result = prettifyJson(testJson, ContentType.JSON);
    expect(result).toBe(expected);
  });

  test('handles JSON with mixed data types', () => {
    const testJson =
      '{"string":"value","number":42,"boolean":true,"null":null,"array":[1,2,3],"object":{"nested":"value"}}';
    const expected =
      '{\n  "string": "value",\n  "number": 42,\n  "boolean": true,\n  "null": null,\n  "array": [\n    1,\n    2,\n    3\n  ],\n  "object": {\n    "nested": "value"\n  }\n}';
    const result = prettifyJson(testJson, ContentType.JSON);
    expect(result).toBe(expected);
  });
});
