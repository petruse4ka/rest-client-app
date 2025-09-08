'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/shared/i18n/navigation';
import { buildSignInRules } from '../model/shema';
import { useSignIn } from '../model/use-sign-in';
import { mapSignInError } from '@/shared/api/firebase/map-sign-in-errors';

import { Button, Form, Input, Typography } from 'antd';

const { Item } = Form;

type FieldType = {
  email?: string;
  password?: string;
};

export function SignInForm() {
  const t = useTranslations('SignInForm');
  const [form] = Form.useForm<FieldType>();
  const rules = buildSignInRules(t);
  const router = useRouter();

  const { mutate, loading } = useSignIn();
  const [apiError, setApiError] = useState<string | null>(null);

  const onFinish = async (values: FieldType) => {
    try {
      setApiError(null);
      await mutate({
        email: values.email!,
        password: values.password!,
      });

      form.resetFields(['email', 'password']);
      router.push('/');
    } catch (e) {
      const { field, key } = mapSignInError(e);
      const msg = t(`apiErrors.${key}`);

      if (field) {
        form.setFields([{ name: field, errors: [msg] }]);
      } else {
        setApiError(msg);
      }
    }
  };

  return (
    <Form form={form} layout="vertical" autoComplete="off" onFinish={onFinish}>
      <Item>
        <Typography.Text type="danger">{apiError || ' '}</Typography.Text>
      </Item>
      <Item<FieldType> label={t('email.label')} name="email" rules={rules.email}>
        <Input placeholder={t('email.placeholder')} />
      </Item>
      <Item<FieldType> label={t('password.label')} name="password" rules={rules.password}>
        <Input.Password placeholder={t('password.placeholder')} />
      </Item>

      <Item shouldUpdate>
        {() => {
          const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
          const hasTouched = form.isFieldsTouched(true);
          return (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
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
