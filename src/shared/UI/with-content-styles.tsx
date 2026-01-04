import { CSSProperties, ComponentType } from 'react';
import { Content } from 'antd/es/layout/layout';

const contentStyles: CSSProperties = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
};

export function withContentStyles<P extends object>(
  Component: ComponentType<P>,
  ContentWrapper: ComponentType<{ children: React.ReactNode; style?: CSSProperties }> = Content
) {
  return function WrappedComponent(props: P) {
    return (
      <ContentWrapper style={contentStyles}>
        <Component {...props} />
      </ContentWrapper>
    );
  };
}
