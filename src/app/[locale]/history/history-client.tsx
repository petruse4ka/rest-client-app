'use client';

import '@ant-design/v5-patch-for-react-19';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Collapse, Empty, Flex, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { mockHistory } from './mock-data';
import { Link } from '@/shared/i18n/navigation';
import { ThemeContext } from '@/context/theme-context';
import { sortByTimestamp } from '@/shared/utils/sort-by-timestamp';
import { useTranslations } from 'next-intl';
import { RequestHistoryItem } from '@/types/interfaces';

const { Title, Text } = Typography;

export default function HistoryView() {
  const t = useTranslations('History');
  const { themeValue } = useContext(ThemeContext);

  const contentStyles: CSSProperties = {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '20px 16px',
  };

  const [history, setHistory] = useState<RequestHistoryItem[]>([]);

  useEffect(() => {
    setHistory(sortByTimestamp(mockHistory));
  }, []);

  return (
    <Content style={contentStyles}>
      <Flex vertical align="center" style={{ width: '100%' }}>
        <Title level={1} style={{ marginBottom: '16px' }}>
          {t('title')}
        </Title>

        {history.length === 0 ? (
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
              margin: '0 auto',
              padding: '20px',
            }}
          >
            <Collapse
              accordion
              items={history.map((item) => ({
                key: item.id,
                label: (
                  <Row gutter={16} wrap style={{ width: '100%' }}>
                    <Col xs={12} md={4}>
                      <Text strong>[{item.method}]</Text>
                    </Col>

                    <Col xs={12} md={4} style={{ textAlign: 'right' }}>
                      <Text type={item.statusCode >= 400 ? 'danger' : 'secondary'}>
                        {item.statusCode}
                      </Text>
                    </Col>

                    <Col
                      xs={24}
                      md={16}
                      style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                    >
                      <Link
                        href="/rest-client"
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
                      <b>{t('duration')}:</b> {item.durationMs} ms
                    </p>
                    <p>
                      <b>{t('requestSize')}:</b> {item.requestSize} bytes
                    </p>
                    <p>
                      <b>{t('responseSize')}:</b> {item.responseSize} bytes
                    </p>
                    {item.errorDetails && (
                      <p>
                        <b>{t('error')}:</b> {item.errorDetails}
                      </p>
                    )}
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
