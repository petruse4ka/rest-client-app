import { FirebaseError } from 'firebase/app';

type Field = 'email' | 'password' | undefined;
type Key =
  | 'userNotFound'
  | 'wrongPassword'
  | 'invalidEmail'
  | 'invalidCredential'
  | 'tooManyRequests'
  | 'network'
  | 'generic';

export function mapSignInError(err: unknown): { field: Field; key: Key } {
  const code = err instanceof FirebaseError ? err.code : undefined;

  switch (code) {
    case 'auth/user-not-found':
      return { field: 'email', key: 'userNotFound' };
    case 'auth/wrong-password':
      return { field: 'password', key: 'wrongPassword' };
    case 'auth/invalid-email':
      return { field: 'email', key: 'invalidEmail' };
    case 'auth/invalid-credential':
      return { field: undefined, key: 'invalidCredential' };
    case 'auth/too-many-requests':
      return { field: undefined, key: 'tooManyRequests' };
    case 'auth/network-request-failed':
      return { field: undefined, key: 'network' };
    default:
      return { field: undefined, key: 'generic' };
  }
}
