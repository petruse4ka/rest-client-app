import { describe, test, expect, vi, beforeEach } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

import { useFormatters } from '@/shared/utils/translate-formatter';

describe('useFormatters', () => {
  let formatMs: (ms: number) => string;
  let formatBytes: (bytes: number) => string;

  beforeEach(() => {
    const fns = useFormatters();
    formatMs = fns.formatMs;
    formatBytes = fns.formatBytes;
  });

  test('formatMs returns "—" for 0', () => {
    expect(formatMs(0)).toBe('—');
  });

  test('formatMs appends unit for positive numbers', () => {
    expect(formatMs(123)).toBe('123 ms');
  });

  test('formatBytes returns "—" for 0', () => {
    expect(formatBytes(0)).toBe('—');
  });

  test('formatBytes uses bytes_one for numbers ending with 1 (except 11)', () => {
    expect(formatBytes(1)).toBe('1 bytes_one');
    expect(formatBytes(21)).toBe('21 bytes_one');
    expect(formatBytes(11)).toBe('11 bytes_many');
  });

  test('formatBytes uses bytes_few for numbers ending with 2-4 (except 12-14)', () => {
    expect(formatBytes(2)).toBe('2 bytes_few');
    expect(formatBytes(3)).toBe('3 bytes_few');
    expect(formatBytes(4)).toBe('4 bytes_few');
    expect(formatBytes(12)).toBe('12 bytes_many');
    expect(formatBytes(14)).toBe('14 bytes_many');
  });

  test('formatBytes uses bytes_many for all other cases', () => {
    expect(formatBytes(5)).toBe('5 bytes_many');
    expect(formatBytes(10)).toBe('10 bytes_many');
    expect(formatBytes(11)).toBe('11 bytes_many');
    expect(formatBytes(15)).toBe('15 bytes_many');
    expect(formatBytes(111)).toBe('111 bytes_many');
  });
});
