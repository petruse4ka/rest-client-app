import type { Rule } from 'antd/es/form';
import type { FormInstance } from 'antd/es/form';

export type SignUpFields = 'username' | 'email' | 'password' | 'confirmPassword';

const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export function buildSignUpRules(
  form: FormInstance,
  t: (key: string) => string
): Record<SignUpFields, Rule[]> {
  return {
    username: [{ required: true, message: t('errors.nameRequired') }],
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
