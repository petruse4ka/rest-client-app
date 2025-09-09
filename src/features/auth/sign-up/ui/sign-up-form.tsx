'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/shared/i18n/navigation';
import { buildSignUpRules } from '../model/schema';
import { useSignUp } from '../model/use-sign-up';
import { mapSignUpError } from '@/shared/api/firebase/map-sign-up-error';

import { Button, Form, Input, Typography } from 'antd';
import Password from 'antd/es/input/Password';

const { Item } = Form;
const { Text } = Typography;

type FieldType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm() {
  const t = useTranslations('SignUpForm');
  const [form] = Form.useForm<FieldType>();
  const rules = buildSignUpRules(form, t);
  const router = useRouter();

  const { mutate, loading } = useSignUp();
  const [apiError, setApiError] = useState<string | null>(null);

  const onFinish = async (values: FieldType) => {
    try {
      setApiError(null);
      await mutate({
        email: values.email!,
        password: values.password!,
        name: values.username,
      });

      form.resetFields(['username', 'email', 'password', 'confirmPassword']);
      router.push('/');
    } catch (e) {
      const { field, key } = mapSignUpError(e);
      const errorMsg = t(`apiErrors.${key}`);

      if (field) {
        form.setFields([{ name: field, errors: [errorMsg] }]);
      } else {
        setApiError(errorMsg);
      }
    }
  };

  return (
    <Form form={form} layout="vertical" autoComplete="off" onFinish={onFinish}>
      <Item>
        <Text type="danger">{apiError || ' '}</Text>
      </Item>
      <Item<FieldType> label={t('name.label')} name="username" rules={rules.username}>
        <Input placeholder={t('name.placeholder')} />
      </Item>

      <Item<FieldType> label={t('email.label')} name="email" rules={rules.email}>
        <Input placeholder={t('email.placeholder')} />
      </Item>

      <Item<FieldType> label={t('password.label')} name="password" rules={rules.password}>
        <Password placeholder={t('password.placeholder')} />
      </Item>

      <Item<FieldType>
        label={t('confirm.label')}
        name="confirmPassword"
        dependencies={['password']}
        rules={rules.confirmPassword}
      >
        <Password placeholder={t('confirm.placeholder')} />
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
