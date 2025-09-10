import type { Rule } from 'antd/es/form';

export type SignInFields = 'email' | 'password';

export function buildSignInRules(t: (key: string) => string): Record<SignInFields, Rule[]> {
  return {
    email: [
      { required: true, message: t('errors.emailRequired') },
      { type: 'email', message: t('errors.emailInvalid') },
    ],
    password: [{ required: true, message: t('errors.passwordRequired') }],
  };
}
