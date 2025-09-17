'use client';

import '@ant-design/v5-patch-for-react-19';
import { CSSProperties, useContext } from 'react';
import { Button, Card, Col, Collapse, Empty, Flex, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Link } from '@/shared/i18n/navigation';
import { ThemeContext } from '@/context/theme-context';
import { useTranslations } from 'next-intl';
import { RequestHistoryItem } from '@/types/interfaces';
import { useFormatters } from '@/shared/utils/';

const { Title, Text } = Typography;

export default function HistoryView({ items }: { items: RequestHistoryItem[] }) {
  const t = useTranslations('History');
  const { themeValue } = useContext(ThemeContext);

  const contentStyles: CSSProperties = {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '20px 16px',
  };

  const { formatMs, formatBytes } = useFormatters();

  return (
    <Content style={contentStyles}>
      <Flex vertical align="center" style={contentStyles}>
        <Title level={1} style={{ marginBottom: '16px' }}>
          {t('title')}
        </Title>

        {items.length === 0 ? (
          <Flex vertical align="center" gap={12}>
            <Empty
              description={
                <Flex vertical align="center">
                  <Text>{t('emptyTitle')}</Text>
                  <Text type="secondary">{t('emptySubtitle')}</Text>
                </Flex>
              }
            ></Empty>

            <Link href="/rest-client">
              <Button type="primary" style={{ marginTop: '20px' }}>
                {t('goRestClient')}
              </Button>
            </Link>
          </Flex>
        ) : (
          <Card
            style={{
              width: '100%',
            }}
          >
            <Collapse
              accordion
              items={items.map((item) => ({
                key: item.id,
                label: (
                  <Row gutter={16} wrap style={{ width: '100%' }}>
                    <Col xs={12} md={4}>
                      <Text strong>[{item.method}]</Text>
                    </Col>

                    <Col xs={12} md={4} style={{ textAlign: 'right' }}>
                      <Text
                        type={
                          item.statusCode === 0
                            ? 'danger'
                            : item.statusCode >= 400
                              ? 'danger'
                              : item.statusCode >= 200 && item.statusCode < 300
                                ? 'success'
                                : 'secondary'
                        }
                      >
                        {item.statusCode === 0 ? t('error') : item.statusCode}
                      </Text>
                    </Col>

                    <Col
                      xs={24}
                      md={16}
                      style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                    >
                      <Link
                        href={item.appRouterURL}
                        className={`link link-font_size_small ${themeValue === 'dark' ? 'link--dark' : 'link--light'}`}
                      >
                        {item.url}
                      </Link>
                    </Col>
                  </Row>
                ),
                children: (
                  <div>
                    <p>
                      <b>{t('timestamp')}:</b> {new Date(item.timestamp).toLocaleString()}
                    </p>
                    <p>
                      <b>{t('duration')}:</b> {formatMs(item.durationMs)}
                    </p>
                    <p>
                      <b>{t('requestSize')}:</b> {formatBytes(item.requestSize)}
                    </p>
                    <p>
                      <b>{t('responseSize')}:</b> {formatBytes(item.responseSize)}
                    </p>
                    <p>
                      <b>{t('error')}:</b>{' '}
                      {item.errorDetails && item.errorDetails.trim() !== ''
                        ? item.errorDetails
                        : t('noError')}
                    </p>
                  </div>
                ),
              }))}
            />
          </Card>
        )}
      </Flex>
    </Content>
  );
}
