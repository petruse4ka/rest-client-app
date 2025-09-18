import { describe, test, expect } from 'vitest';
import { FirebaseError } from 'firebase/app';
import { mapResetPasswordError } from '@/shared/api/firebase/map-reset-password-errors';

describe('mapResetPasswordError', () => {
  test.each([
    ['auth/invalid-email', { field: 'email', key: 'invalidEmail' }],
    ['auth/too-many-requests', { field: undefined, key: 'tooManyRequests' }],
    ['auth/network-request-failed', { field: undefined, key: 'network' }],
  ])('maps %s correctly', (code, expected) => {
    const err = new FirebaseError(code, 'msg');
    expect(mapResetPasswordError(err)).toEqual(expected);
  });

  test('returns generic for unknown FirebaseError code', () => {
    const err = new FirebaseError('auth/other', 'msg');
    expect(mapResetPasswordError(err)).toEqual({
      field: undefined,
      key: 'generic',
    });
  });

  test('returns generic for non-Firebase errors', () => {
    expect(mapResetPasswordError(new Error('oops'))).toEqual({
      field: undefined,
      key: 'generic',
    });
    expect(mapResetPasswordError('string')).toEqual({
      field: undefined,
      key: 'generic',
    });
    expect(mapResetPasswordError(null)).toEqual({
      field: undefined,
      key: 'generic',
    });
  });
});
