import type { Rule, FormInstance } from 'antd/es/form';

export type SignUpFields = 'username' | 'email' | 'password' | 'confirmPassword';

const PASSWORD_PATTERN = /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d)(?=.*[^\p{L}\p{N}\s]).{8,}$/u;

export function buildSignUpRules(
  form: FormInstance,
  t: (key: string) => string
): Record<SignUpFields, Rule[]> {
  return {
    username: [
      { required: true, message: t('errors.nameRequired') },
      { max: 30, message: t('errors.nameTooLong') },
    ],
    email: [
      { required: true, message: t('errors.emailRequired') },
      { type: 'email', message: t('errors.emailInvalid') },
    ],
    password: [
      { required: true, message: t('errors.passwordRequired') },
      {
        pattern: PASSWORD_PATTERN,
        message: t('errors.passwordPattern'),
      },
    ],
    confirmPassword: [
      { required: true, message: t('errors.confirmRequired') },
      {
        validator(_, value) {
          if (!value || form.getFieldValue('password') === value) return Promise.resolve();
          return Promise.reject(new Error(t('errors.passwordsDontMatch')));
        },
      },
    ],
  };
}
