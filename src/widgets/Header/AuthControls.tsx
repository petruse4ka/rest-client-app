import { Button, Flex } from 'antd';
import { useTranslations } from 'next-intl';

export default function AuthControls({ isLogin }: { isLogin: boolean }) {
  const t = useTranslations('Header');
  return (
    <>
      {isLogin ? (
        <Button type="primary">{t('signOut')}</Button>
      ) : (
        <Flex gap="middle">
          <Button type="primary">{t('signIn')}</Button>
          <Button type="primary">{t('signUp')}</Button>
        </Flex>
      )}
    </>
  );
}
