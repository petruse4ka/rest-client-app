import { FirebaseError } from 'firebase/app';

type Field = undefined;
type ErrorKey = 'popupClosed' | 'accountExists' | 'network' | 'tooManyRequests' | 'generic';

export function mapGoogleAuthError(err: unknown): { field: Field; key: ErrorKey } {
  const code = err instanceof FirebaseError ? err.code : undefined;

  switch (code) {
    case 'auth/popup-closed-by-user':
      return { field: undefined, key: 'popupClosed' };
    case 'auth/account-exists-with-different-credential':
      return { field: undefined, key: 'accountExists' };
    case 'auth/network-request-failed':
      return { field: undefined, key: 'network' };
    case 'auth/too-many-requests':
      return { field: undefined, key: 'tooManyRequests' };
    default:
      return { field: undefined, key: 'generic' };
  }
}
