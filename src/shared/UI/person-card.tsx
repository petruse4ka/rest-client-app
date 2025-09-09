import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Space, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
const { Text, Link } = Typography;

interface PersonCardProps {
  person: {
    name: string;
    description: string;
    img: string;
    github: {
      link: string;
      name: string;
    };
  };
}

export function PersonCard({ person }: PersonCardProps) {
  const { name, description, img, github } = person;

  return (
    <Card
      title={
        <Space align="center" size="large">
          <Avatar size={50} src={img} alt={name} />
          <Title level={3}>{name}</Title>
        </Space>
      }
      style={{ width: '100%', maxWidth: '400px' }}
    >
      <Flex justify="space-between" vertical gap={15} style={{ height: '100%' }}>
        <Text>{description}</Text>
        <Link href={github.link} target="_blank" style={{ alignSelf: 'flex-end' }}>
          <Space size="small">
            <GithubOutlined />
            {github.name}
          </Space>
        </Link>
      </Flex>
    </Card>
  );
}
