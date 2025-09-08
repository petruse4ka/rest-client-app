import { courseLinks } from '@/shared/config/navigation';
import { Button, Divider, Flex, Space, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { Fragment } from 'react/jsx-runtime';
const { Text, Link } = Typography;

export function AboutCourseSection() {
  return (
    <Flex vertical align="center" gap={30} className="!py-5">
      <Space direction="vertical" align="center">
        <Title level={2}>About Course</Title>
        <Text>This web application was created during a React course at RSSchool.</Text>
      </Space>
      <Space>
        {courseLinks.map(({ href, label }, index) => (
          <Fragment key={label}>
            <Link href={href}>{label}</Link>
            {index < courseLinks.length - 1 && <Divider type="vertical" />}
          </Fragment>
        ))}
      </Space>
    </Flex>
  );
}
