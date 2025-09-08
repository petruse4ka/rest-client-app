import { getDefaultTheme } from '@/shared/utils';
import { test, expect, vi } from 'vitest';

describe('getDefaultTheme', () => {
  test('returns dark when system prefers dark', () => {
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
      })),
      writable: true,
    });

    const result = getDefaultTheme();
    expect(result).toBe('dark');
  });

  test('returns light when system prefers light', () => {
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation((query) => ({
        matches: query === 'light',
      })),
      writable: true,
    });

    const result = getDefaultTheme();
    expect(result).toBe('light');
  });
});
