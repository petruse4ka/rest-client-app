import { auth } from '@/shared/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  type UserCredential,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

export type AuthPayload = { email: string; password: string };

export async function apiSignUp({ email, password }: AuthPayload): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function apiSignUpWithGooglePopup(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  return signInWithPopup(auth, provider);
}

export async function apiSignIn({ email, password }: AuthPayload): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function apiResetPassword(email: string): Promise<void> {
  return sendPasswordResetEmail(auth, email);
}
