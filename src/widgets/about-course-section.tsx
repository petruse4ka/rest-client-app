import { courseLinks } from '@/shared/config/navigation';
import { Divider, Flex, Space, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react/jsx-runtime';
const { Text, Link } = Typography;

export function AboutCourseSection() {
  const t = useTranslations('Course');

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      gap={30}
      style={{
        minHeight: '100svh',
        textAlign: 'center',
      }}
    >
      <Space direction="vertical" align="center">
        <Title level={2}>{t('title')}</Title>
        <Text style={{ fontSize: '1.5rem' }}>{t('subtitle')}</Text>
      </Space>
      <Space>
        {courseLinks.map(({ href, label }, index) => (
          <Fragment key={label}>
            <Link target="_blank" href={href} style={{ fontSize: '1.2rem' }}>
              {t(label)}
            </Link>
            {index < courseLinks.length - 1 && <Divider type="vertical" />}
          </Fragment>
        ))}
      </Space>
    </Flex>
  );
}
