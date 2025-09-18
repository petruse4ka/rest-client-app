import { FirebaseError } from 'firebase/app';

type Field = 'email' | undefined;
type Key = 'userNotFound' | 'invalidEmail' | 'tooManyRequests' | 'network' | 'generic';

export function mapResetPasswordError(err: unknown): { field: Field; key: Key } {
  const code = err instanceof FirebaseError ? err.code : undefined;

  switch (code) {
    case 'auth/invalid-email':
      return { field: 'email', key: 'invalidEmail' };
    case 'auth/too-many-requests':
      return { field: undefined, key: 'tooManyRequests' };
    case 'auth/network-request-failed':
      return { field: undefined, key: 'network' };
    default:
      return { field: undefined, key: 'generic' };
  }
}
