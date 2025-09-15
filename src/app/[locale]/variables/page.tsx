'use client';

import '@ant-design/v5-patch-for-react-19';
import { Flex, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { CSSProperties, lazy, Suspense } from 'react';
import { useTranslations } from 'next-intl';

const EditableTable = lazy(() => import('@/features/editable-table'));

const contentStyles: CSSProperties = {
  height: '100%',
  padding: '20px',
  textAlign: 'center',
};

export default function VariablesPage() {
  const t = useTranslations('Variables');

  return (
    <Suspense fallback={<Spin tip="Loading..." size="large" />}>
      <Content style={contentStyles}>
        <Flex vertical gap={20}>
          <Title>{t('title')}</Title>
          <EditableTable />
        </Flex>
      </Content>
    </Suspense>
  );
}
