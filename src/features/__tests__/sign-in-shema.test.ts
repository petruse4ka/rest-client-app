import { describe, test, beforeEach, vi, expect } from 'vitest';
import enMessages from '@/shared/i18n/messages/en.json';
import { buildSignInRules } from '@/features/auth/sign-in/model/shema';

describe('buildSignInRules', () => {
  let t: (key: string) => string;
  const { emailRequired, emailInvalid, passwordRequired } = enMessages.SignInForm.errors;

  beforeEach(() => {
    vi.clearAllMocks();

    t = vi.fn((key: string) => {
      const map: Record<string, string> = {
        'errors.emailRequired': emailRequired,
        'errors.emailInvalid': emailInvalid,
        'errors.passwordRequired': passwordRequired,
      };
      return map[key] ?? key;
    });
  });

  test('returns rules for both email and password', () => {
    const rules = buildSignInRules(t);

    expect(Object.keys(rules).sort()).toEqual(['email', 'password']);

    expect(rules.email).toHaveLength(2);
    expect(rules.email[0]).toEqual(
      expect.objectContaining({ required: true, message: emailRequired })
    );
    expect(rules.email[1]).toEqual(
      expect.objectContaining({ type: 'email', message: emailInvalid })
    );

    expect(rules.password).toHaveLength(1);
    expect(rules.password[0]).toEqual(
      expect.objectContaining({ required: true, message: passwordRequired })
    );
  });

  test('uses translator keys correctly', () => {
    buildSignInRules(t);
    expect(t).toHaveBeenCalledWith('errors.emailRequired');
    expect(t).toHaveBeenCalledWith('errors.emailInvalid');
    expect(t).toHaveBeenCalledWith('errors.passwordRequired');
    expect(vi.mocked(t).mock.calls).toHaveLength(3);
  });
});
