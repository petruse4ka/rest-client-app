import { vi } from 'vitest';
import { substituteVariables } from '../utils';
import { VariablesData } from '@/types/types';

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('substituteVariables', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('returns original text when no variables are present', () => {
    const text = 'https://api.example.com/users';

    const result = substituteVariables(text);

    expect(result).toBe(text);
  });

  test('returns original text when text is empty string', () => {
    const text = '';

    const result = substituteVariables(text);

    expect(result).toBe(text);
  });

  test('returns original text when text is null', () => {
    const text = null as unknown as string;

    const result = substituteVariables(text);

    expect(result).toBe(text);
  });

  test('returns original text when text is undefined', () => {
    const text = undefined as unknown as string;

    const result = substituteVariables(text);

    expect(result).toBe(text);
  });

  test('returns original text when text is not a string', () => {
    const text = 123 as unknown as string;

    const result = substituteVariables(text);

    expect(result).toBe(text);
  });

  test('keeps original variable syntax when no variables in localStorage', () => {
    const text = 'https://{{baseUrl}}/users';

    const result = substituteVariables(text);

    expect(result).toBe('https://{{baseUrl}}/users');
  });

  test('handles empty variable name', () => {
    const text = '{{}}';

    const result = substituteVariables(text);

    expect(result).toBe('{{}}');
  });

  test('handles nested variable syntax', () => {
    const text = '{{outer{{inner}}outer}}';

    const result = substituteVariables(text);

    expect(result).toBe('{{outer{{inner}}outer}}');
  });

  test('substitutes single variable with value from localStorage', () => {
    const text = 'https://{{baseUrl}}/users';
    const variables: VariablesData[] = [{ key: 1, variable: 'baseUrl', value: 'api.example.com' }];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(variables));

    const result = substituteVariables(text);

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('rest-variables');
    expect(result).toBe('https://api.example.com/users');
  });

  test('substitutes multiple variables from localStorage', () => {
    const text = 'https://{{baseUrl}}/{{version}}/users/{{userId}}';
    const variables: VariablesData[] = [
      { key: 1, variable: 'baseUrl', value: 'api.example.com' },
      { key: 2, variable: 'version', value: 'v1' },
      { key: 3, variable: 'userId', value: '123' },
    ];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(variables));

    const result = substituteVariables(text);

    expect(result).toBe('https://api.example.com/v1/users/123');
  });

  test('keeps original variable syntax when variable not found in localStorage', () => {
    const text = 'https://{{unknownVar}}/users';
    const variables: VariablesData[] = [{ key: 1, variable: 'baseUrl', value: 'api.example.com' }];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(variables));

    const result = substituteVariables(text);

    expect(result).toBe('https://{{unknownVar}}/users');
  });

  test('handles mixed found and not found variables', () => {
    const text = 'https://{{baseUrl}}/{{unknownVar}}/users';
    const variables: VariablesData[] = [{ key: 1, variable: 'baseUrl', value: 'api.example.com' }];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(variables));

    const result = substituteVariables(text);

    expect(result).toBe('https://api.example.com/{{unknownVar}}/users');
  });

  test('handles duplicate variables in text', () => {
    const text = '{{baseUrl}}/users and {{baseUrl}}/posts';
    const variables: VariablesData[] = [{ key: 1, variable: 'baseUrl', value: 'api.example.com' }];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(variables));

    const result = substituteVariables(text);

    expect(result).toBe('api.example.com/users and api.example.com/posts');
  });

  test('handles case-sensitive variable names', () => {
    const text = '{{BaseUrl}} and {{baseUrl}}';
    const variables: VariablesData[] = [
      { key: 1, variable: 'baseUrl', value: 'lowercase' },
      { key: 2, variable: 'BaseUrl', value: 'uppercase' },
    ];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(variables));

    const result = substituteVariables(text);

    expect(result).toBe('uppercase and lowercase');
  });

  test('handles empty variables array from localStorage', () => {
    const text = 'https://{{baseUrl}}/users';
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([]));

    const result = substituteVariables(text);

    expect(result).toBe('https://{{baseUrl}}/users');
  });
});
