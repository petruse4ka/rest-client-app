'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import '@ant-design/v5-patch-for-react-19';
import { updateProfile } from 'firebase/auth';
import { useRouter } from '@/shared/i18n/navigation';
import { buildSignUpRules } from '../model/schema';
import { apiSignUp } from '@/shared/api/firebase/auth';
import { mapSignUpError } from '@/shared/api/firebase/map-sign-up-error';
import { finalizeLogin } from '@/shared/lib/auth/finalize-login';

import { Button, Form, Input, Typography } from 'antd';
import Password from 'antd/es/input/Password';
import { appRoutes } from '@/shared/config/navigation';

const { Item } = Form;
const { Text } = Typography;

type FieldType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpFormProps = { onSubmittingChange?: (v: boolean) => void };

export function SignUpForm({ onSubmittingChange }: SignUpFormProps) {
  const t = useTranslations('SignUpForm');
  const [form] = Form.useForm<FieldType>();
  const rules = buildSignUpRules(form, t);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const setSubmitting = (v: boolean) => {
    setLoading(v);
    onSubmittingChange?.(v);
  };

  const onFinish = async (v: FieldType) => {
    setApiError(null);
    setSubmitting(true);
    try {
      const cred = await apiSignUp({ email: v.email!, password: v.password! });
      await updateProfile(cred.user, { displayName: v.username });
      await finalizeLogin();
      form.resetFields(['username', 'email', 'password', 'confirmPassword']);
      router.replace(appRoutes.home);
      router.refresh();
    } catch (e) {
      const { field, key } = mapSignUpError(e);
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
      <Item<FieldType> label={t('name.label')} name="username" rules={rules.username}>
        <Input placeholder={t('name.placeholder')} autoComplete="name" />
      </Item>

      <Item<FieldType> label={t('email.label')} name="email" rules={rules.email}>
        <Input placeholder={t('email.placeholder')} autoComplete="email" />
      </Item>

      <Item<FieldType> label={t('password.label')} name="password" rules={rules.password}>
        <Password placeholder={t('password.placeholder')} autoComplete="new-password" />
      </Item>

      <Item<FieldType>
        label={t('confirm.label')}
        name="confirmPassword"
        dependencies={['password']}
        rules={rules.confirmPassword}
      >
        <Password placeholder={t('confirm.placeholder')} autoComplete="new-password" />
      </Item>

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
