'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import '@ant-design/v5-patch-for-react-19';
import { buildResetPswRules } from '../model/shema';
import { apiResetPassword } from '@/shared/api/firebase/auth';
import { Button, Form, Input, Typography } from 'antd';
import { mapResetPasswordError } from '@/shared/api/firebase/map-reset-password-errors';

const { Item } = Form;
const { Text } = Typography;

type FieldType = {
  email?: string;
};

type ForgotPasswordFormProps = { onSubmittingChange?: (v: boolean) => void };

export function ForgotPasswordForm({ onSubmittingChange }: ForgotPasswordFormProps) {
  const t = useTranslations('ForgotPasswordForm');
  const [form] = Form.useForm<FieldType>();
  const rules = buildResetPswRules(t);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const setSubmitting = (v: boolean) => {
    setLoading(v);
    onSubmittingChange?.(v);
  };

  const onFinish = async (values: FieldType) => {
    try {
      setApiError(null);
      setSuccessMessage(null);
      setSubmitting(true);

      await apiResetPassword(values.email!);
      setSuccessMessage(t('messages.linkSent'));
    } catch (e) {
      const { field, key } = mapResetPasswordError(e);
      const msg = t(`apiErrors.${key}`);

      if (field) {
        form.setFields([{ name: field, errors: [msg] }]);
      } else {
        setApiError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Item>
        <Text type="danger">{apiError || ' '}</Text>
      </Item>
      <Item<FieldType> label={t('email.label')} name="email" rules={rules.email}>
        <Input
          onChange={() => {
            if (successMessage) setSuccessMessage(null);
          }}
          placeholder={t('email.placeholder')}
          autoComplete="email"
        />
      </Item>

      {successMessage && (
        <Item>
          <Text type="success">{successMessage}</Text>
        </Item>
      )}

      <Item shouldUpdate style={{ paddingTop: 16 }}>
        {() => {
          const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
          const hasTouched = form.isFieldsTouched(true);
          return (
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              disabled={!hasTouched || hasErrors}
            >
              {t('submit')}
            </Button>
          );
        }}
      </Item>
    </Form>
  );
}
