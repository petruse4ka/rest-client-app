import { team } from '@/shared/config/team';
import { PersonCard } from '@/shared/UI';
import { Flex } from 'antd';

export function TeamSection() {
  return (
    <Flex>
      {team.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </Flex>
  );
}
