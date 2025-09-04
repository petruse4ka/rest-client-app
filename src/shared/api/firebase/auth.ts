import { auth } from '@/shared/config/firebase';
import { createUserWithEmailAndPassword, type UserCredential } from 'firebase/auth';

export type SignUpPayload = { email: string; password: string };

export async function apiSignUp({ email, password }: SignUpPayload): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}
