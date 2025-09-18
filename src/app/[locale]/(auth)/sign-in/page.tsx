import { CSSProperties } from 'react';
import { Content } from 'antd/es/layout/layout';
import AuthClientWrapper from '../auth-client-wrapper';
import { useTranslations } from 'next-intl';

export default function SignIpPage() {
  const contentStyles: CSSProperties = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  };

  const t = useTranslations('Auth');
  const loadingText = t('loading');

  return (
    <Content style={contentStyles}>
      <AuthClientWrapper loadingText={loadingText} />
    </Content>
  );
}
