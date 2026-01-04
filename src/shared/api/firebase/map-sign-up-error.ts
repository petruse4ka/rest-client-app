import { FirebaseError } from 'firebase/app';

type Field = 'email' | 'password' | undefined;
type ErrorKey =
  | 'emailInUse'
  | 'invalidEmail'
  | 'weakPassword'
  | 'network'
  | 'tooManyRequests'
  | 'generic';

export function mapSignUpError(err: unknown): { field: Field; key: ErrorKey } {
  const code = err instanceof FirebaseError ? err.code : undefined;

  switch (code) {
    case 'auth/email-already-in-use':
      return { field: 'email', key: 'emailInUse' };
    case 'auth/invalid-email':
      return { field: 'email', key: 'invalidEmail' };
    case 'auth/weak-password':
      return { field: 'password', key: 'weakPassword' };
    case 'auth/network-request-failed':
      return { field: undefined, key: 'network' };
    case 'auth/too-many-requests':
      return { field: undefined, key: 'tooManyRequests' };
    default:
      return { field: undefined, key: 'generic' };
  }
}
