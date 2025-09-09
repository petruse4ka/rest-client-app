import { team } from '@/shared/config/team';
import { PersonCard } from '@/shared/UI';
import { Flex, Grid } from 'antd';
import Title from 'antd/es/typography/Title';
const { useBreakpoint } = Grid;

export function TeamSection() {
  const screens = useBreakpoint();

  return (
    <Flex vertical align="center" gap={30} style={{ minHeight: '100svh' }}>
      <Title level={2}>Our Team</Title>
      <Flex gap={20} vertical={!screens.lg}>
        {team.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </Flex>
    </Flex>
  );
}
