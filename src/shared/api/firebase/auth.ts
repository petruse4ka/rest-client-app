import { auth } from '@/shared/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  type UserCredential,
} from 'firebase/auth';

export type SignUpPayload = { email: string; password: string };

export async function apiSignUp({ email, password }: SignUpPayload): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function apiSignUpWithGooglePopup(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  return signInWithPopup(auth, provider);
}
