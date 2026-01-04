'use client';

import { Spin, Flex } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { CSSProperties } from 'react';
import enMessages from '@/shared/i18n/messages/en.json';

type LoadingSpinnerProps = {
  tip?: string;
  size?: 'small' | 'default' | 'large';
  style?: CSSProperties;
};

export function LoadingSpinner({
  tip = enMessages.LoadingSpinner.loading,
  size = 'large',
  style = {},
}: LoadingSpinnerProps) {
  const contentStyles: CSSProperties = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
    ...style,
  };

  return (
    <Content style={contentStyles}>
      <Flex vertical align="center" justify="center">
        <Spin size={size} tip={tip}>
          <div style={{ padding: '50px' }} />
        </Spin>
      </Flex>
    </Content>
  );
}
