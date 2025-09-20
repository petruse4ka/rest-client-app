'use client';

import { GithubOutlined } from '@ant-design/icons';
import { Card, Flex, Space, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
const { Text, Link } = Typography;

interface PersonCardProps {
  person: {
    name: string;
    img: string;
    github: {
      link: string;
      name: string;
    };
  };
}

export function PersonCard({ person }: PersonCardProps) {
  const { name, img, github } = person;
  const t = useTranslations('Team');

  return (
    <Card
      title={
        <Title level={3} style={{ textAlign: 'center', margin: 0 }}>
          {t(`${name}.name`)}
        </Title>
      }
      style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        border: 'none',
      }}
    >
      <Flex vertical align="center" gap={15} style={{ height: '100%' }}>
        <Image
          src={img}
          alt={name}
          width={120}
          height={120}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '20px',
          }}
        />
        <Flex justify="space-between" vertical gap={15}>
          <Text style={{ textAlign: 'center' }}>{t(`${name}.description`)}</Text>
          <Link href={github.link} target="_blank" style={{ alignSelf: 'flex-end' }}>
            <Space size="small">
              <GithubOutlined />
              {github.name}
            </Space>
          </Link>
        </Flex>
      </Flex>
    </Card>
  );
}
