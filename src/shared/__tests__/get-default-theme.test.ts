import { getDefaultTheme } from '../utils';

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

  test('returns light when system does not prefer dark', () => {
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation(() => ({
        matches: false,
      })),
      writable: true,
    });

    const result = getDefaultTheme();
    expect(result).toBe('light');
  });
});
