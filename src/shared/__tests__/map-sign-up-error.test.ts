import { describe, test, expect } from 'vitest';
import { FirebaseError } from 'firebase/app';
import { mapSignUpError } from '@/shared/api/firebase/map-sign-up-error';

describe('mapSignUpError', () => {
  test.each([
    ['auth/email-already-in-use', { field: 'email', key: 'emailInUse' }],
    ['auth/invalid-email', { field: 'email', key: 'invalidEmail' }],
    ['auth/weak-password', { field: 'password', key: 'weakPassword' }],
    ['auth/network-request-failed', { field: undefined, key: 'network' }],
    ['auth/too-many-requests', { field: undefined, key: 'tooManyRequests' }],
  ])('maps %s correctly', (code, expected) => {
    const err = new FirebaseError(code, 'msg');
    expect(mapSignUpError(err)).toEqual(expected);
  });

  test('returns generic for unknown FirebaseError', () => {
    const err = new FirebaseError('auth/some-other', 'msg');
    expect(mapSignUpError(err)).toEqual({ field: undefined, key: 'generic' });
  });

  test('returns generic for non-Firebase errors', () => {
    expect(mapSignUpError(new Error('oops'))).toEqual({
      field: undefined,
      key: 'generic',
    });
    expect(mapSignUpError('string')).toEqual({
      field: undefined,
      key: 'generic',
    });
    expect(mapSignUpError(null)).toEqual({
      field: undefined,
      key: 'generic',
    });
  });
});
