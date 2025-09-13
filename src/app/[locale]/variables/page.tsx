'use client';

import '@ant-design/v5-patch-for-react-19';
import { Flex } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { CSSProperties } from 'react';
import EditableTable from '@/features/editable-table';
import { useTranslations } from 'next-intl';

const contentStyles: CSSProperties = {
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '0 16px',
  height: '100%',
  textAlign: 'center',
};

export default function VariablesPage() {
  const t = useTranslations('Variables');

  return (
    <Content>
      <Flex vertical gap={20} style={contentStyles}>
        <Title>{t('title')}</Title>
        <EditableTable />
      </Flex>
    </Content>
  );
}
