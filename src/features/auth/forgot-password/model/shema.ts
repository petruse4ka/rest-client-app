import type { Rule } from 'antd/es/form';

export type ResetPswFields = 'email';

export function buildResetPswRules(t: (key: string) => string): Record<ResetPswFields, Rule[]> {
  return {
    email: [
      { required: true, message: t('errors.emailRequired') },
      { type: 'email', message: t('errors.emailInvalid') },
    ],
  };
}
