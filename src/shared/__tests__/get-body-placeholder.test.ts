import { getBodyPlaceholder } from '../utils';
import { ContentType } from '@/types/types';
import { JSON_PLACEHOLDER, XML_PLACEHOLDER } from '@/shared/constants';

describe('getBodyPlaceholder', () => {
  const defaultPlaceholder = 'Default placeholder';

  test('returns JSON placeholder for JSON content type', () => {
    const result = getBodyPlaceholder(ContentType.JSON, defaultPlaceholder);
    expect(result).toBe(JSON_PLACEHOLDER);
  });

  test('returns XML placeholder for XML content type', () => {
    const result = getBodyPlaceholder(ContentType.XML, defaultPlaceholder);
    expect(result).toBe(XML_PLACEHOLDER);
  });

  test('returns default placeholder for TEXT content type', () => {
    const result = getBodyPlaceholder(ContentType.TEXT, defaultPlaceholder);
    expect(result).toBe(defaultPlaceholder);
  });
});
