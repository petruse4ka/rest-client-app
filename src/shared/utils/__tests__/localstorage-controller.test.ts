import { beforeEach } from 'vitest';
import { localStorageController } from '../local-storage-controller';

describe('Tests for localStorage controller', () => {
  beforeEach(() => {
    localStorage.clear;
  });

  test('Add and get string in localStorage', () => {
    const value = 'value for test in ls';
    const key = 'test';

    localStorageController.set(key, value);

    const result = localStorageController.get(key);
    expect(result).toEqual(value);
  });

  test('Add and get object in localStorage', () => {
    const value = {
      key1: 'value1',
      key2: 'value2',
    };

    const key = 'test';

    localStorageController.set(key, value);

    const result = localStorageController.get(key);
    expect(result).toEqual(value);
  });

  test('Add and get boolean in localStorage', () => {
    localStorageController.set('bool', true);
    const result = localStorageController.get('bool');
    expect(result).toBe(true);
  });

  test('Get non-existent key in localStorage', () => {
    const result = localStorageController.get('nonexistent');
    expect(result).toBeNull();
  });

  test('Delete key from localStorage', () => {
    const key = 'test';

    localStorage.setItem(key, 'test value');

    localStorageController.remove(key);
    expect(localStorage.getItem(key)).toBeNull();
  });
});
