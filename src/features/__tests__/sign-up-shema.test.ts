import { describe, test, beforeEach, vi, expect, type Mock } from 'vitest';
import enMessages from '@/shared/i18n/messages/en.json';
import { buildSignUpRules } from '@/features/auth/sign-up/model/schema';
import type { FormInstance } from 'antd/es/form';
import type { RuleObject } from 'antd/es/form';

function invokeValidator(ruleObj: RuleObject, value: unknown) {
  const v = ruleObj.validator!;
  return new Promise<void>((resolve, reject) => {
    try {
      const maybe = v(ruleObj, value, (err?: unknown) => (err ? reject(err) : resolve()));
      if (maybe && typeof (maybe as Promise<unknown>).then === 'function') {
        (maybe as Promise<unknown>).then(() => resolve()).catch(reject);
      }
    } catch (e) {
      reject(e);
    }
  });
}

describe('buildSignUpRules', () => {
  let t: (key: string) => string;
  let form: FormInstance;

  const {
    nameRequired,
    emailRequired,
    emailInvalid,
    passwordRequired,
    passwordPattern,
    confirmRequired,
    passwordsDontMatch,
  } = enMessages.SignUpForm.errors;

  beforeEach(() => {
    vi.clearAllMocks();
    t = vi.fn((key: string) => {
      const map: Record<string, string> = {
        'errors.nameRequired': nameRequired,
        'errors.emailRequired': emailRequired,
        'errors.emailInvalid': emailInvalid,
        'errors.passwordRequired': passwordRequired,
        'errors.passwordPattern': passwordPattern,
        'errors.confirmRequired': confirmRequired,
        'errors.passwordsDontMatch': passwordsDontMatch,
      };
      return map[key] ?? key;
    });
    form = { getFieldValue: vi.fn() } as unknown as FormInstance;
  });

  test('returns rules for all fields', () => {
    const rules = buildSignUpRules(form, t);

    expect(Object.keys(rules).sort()).toEqual(['confirmPassword', 'email', 'password', 'username']);

    expect(rules.username[0]).toEqual(
      expect.objectContaining({ required: true, message: nameRequired })
    );
    expect(rules.email[0]).toEqual(
      expect.objectContaining({ required: true, message: emailRequired })
    );
    expect(rules.email[1]).toEqual(
      expect.objectContaining({ type: 'email', message: emailInvalid })
    );
    expect(rules.password[0]).toEqual(
      expect.objectContaining({ required: true, message: passwordRequired })
    );
    expect(rules.password[1]).toEqual(
      expect.objectContaining({ pattern: expect.any(RegExp), message: passwordPattern })
    );

    const withValidator = rules.confirmPassword.find(
      (r): r is RuleObject => typeof (r as RuleObject).validator === 'function'
    );
    expect(withValidator).toBeTruthy();
  });

  test('confirmPassword validator resolves if values match', async () => {
    const rules = buildSignUpRules(form, t);
    const ruleObj = rules.confirmPassword.find(
      (r): r is RuleObject => typeof (r as RuleObject).validator === 'function'
    )!;
    (form.getFieldValue as unknown as Mock).mockReturnValue('Secret123!');

    await expect(invokeValidator(ruleObj, 'Secret123!')).resolves.toBeUndefined();
    expect(t).not.toHaveBeenCalledWith('errors.passwordsDontMatch');
  });

  test('confirmPassword validator rejects if values differ', async () => {
    const rules = buildSignUpRules(form, t);
    const ruleObj = rules.confirmPassword.find(
      (r): r is RuleObject => typeof (r as RuleObject).validator === 'function'
    )!;
    (form.getFieldValue as unknown as Mock).mockReturnValue('Secret123!');

    await expect(invokeValidator(ruleObj, 'Wrong123!')).rejects.toThrow(passwordsDontMatch);
    expect(t).toHaveBeenCalledWith('errors.passwordsDontMatch');
  });
});
