import { describe, test, beforeEach, vi, expect } from 'vitest';
import enMessages from '@/shared/i18n/messages/en.json';
import { buildResetPswRules } from '@/features/auth/forgot-password/model/shema';

describe('buildResetPswRules', () => {
  let t: (key: string) => string;
  const { emailRequired, emailInvalid } = enMessages.ForgotPasswordForm.errors;

  beforeEach(() => {
    vi.clearAllMocks();

    t = vi.fn((key: string) => {
      const map: Record<string, string> = {
        'errors.emailRequired': emailRequired,
        'errors.emailInvalid': emailInvalid,
      };
      return map[key] ?? key;
    });
  });

  test('returns rules for email', () => {
    const rules = buildResetPswRules(t);

    expect(Object.keys(rules)).toEqual(['email']);

    expect(rules.email).toHaveLength(2);
    expect(rules.email[0]).toEqual(
      expect.objectContaining({ required: true, message: emailRequired })
    );
    expect(rules.email[1]).toEqual(
      expect.objectContaining({ type: 'email', message: emailInvalid })
    );
  });

  test('uses translator keys correctly', () => {
    buildResetPswRules(t);
    expect(t).toHaveBeenCalledWith('errors.emailRequired');
    expect(t).toHaveBeenCalledWith('errors.emailInvalid');
    expect(vi.mocked(t).mock.calls).toHaveLength(2);
  });
});
