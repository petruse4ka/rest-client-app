import { describe, test, expect } from 'vitest';
import { FirebaseError } from 'firebase/app';
import { mapGoogleAuthError } from '@/shared/api/firebase/map-google-error';

describe('mapGoogleAuthError', () => {
  test.each([
    ['auth/popup-closed-by-user', { field: undefined, key: 'popupClosed' }],
    ['auth/account-exists-with-different-credential', { field: undefined, key: 'accountExists' }],
    ['auth/network-request-failed', { field: undefined, key: 'network' }],
    ['auth/too-many-requests', { field: undefined, key: 'tooManyRequests' }],
  ])('maps %s correctly', (code, expected) => {
    const err = new FirebaseError(code, 'msg');
    expect(mapGoogleAuthError(err)).toEqual(expected);
  });

  test('returns generic for unknown FirebaseError code', () => {
    const err = new FirebaseError('auth/other', 'msg');
    expect(mapGoogleAuthError(err)).toEqual({ field: undefined, key: 'generic' });
  });

  test('returns generic for non-Firebase errors', () => {
    expect(mapGoogleAuthError(new Error('oops'))).toEqual({
      field: undefined,
      key: 'generic',
    });
    expect(mapGoogleAuthError('string')).toEqual({
      field: undefined,
      key: 'generic',
    });
    expect(mapGoogleAuthError(null)).toEqual({
      field: undefined,
      key: 'generic',
    });
  });
});
