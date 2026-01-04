import { describe, test, expect } from 'vitest';
import { FirebaseError } from 'firebase/app';
import { mapSignInError } from '@/shared/api/firebase/map-sign-in-errors';

describe('mapSignInError', () => {
  test.each([
    ['auth/user-not-found', { field: 'email', key: 'userNotFound' }],
    ['auth/wrong-password', { field: 'password', key: 'wrongPassword' }],
    ['auth/invalid-email', { field: 'email', key: 'invalidEmail' }],
    ['auth/invalid-credential', { field: undefined, key: 'invalidCredential' }],
    ['auth/too-many-requests', { field: undefined, key: 'tooManyRequests' }],
    ['auth/network-request-failed', { field: undefined, key: 'network' }],
  ])('maps %s correctly', (code, expected) => {
    const err = new FirebaseError(code, 'msg');
    expect(mapSignInError(err)).toEqual(expected);
  });

  test('returns generic for unknown FirebaseError code', () => {
    const err = new FirebaseError('auth/other', 'msg');
    expect(mapSignInError(err)).toEqual({
      field: undefined,
      key: 'generic',
    });
  });

  test('returns generic for non-Firebase errors', () => {
    expect(mapSignInError(new Error('oops'))).toEqual({
      field: undefined,
      key: 'generic',
    });
    expect(mapSignInError('string')).toEqual({
      field: undefined,
      key: 'generic',
    });
    expect(mapSignInError(null)).toEqual({
      field: undefined,
      key: 'generic',
    });
  });
});
