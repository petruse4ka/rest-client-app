import { render } from '@/__tests__/test-utils/test-utils';
import { TeamSection } from '../team-section';
import { screen } from '@testing-library/react';
import { team } from '@/shared/config/team';

describe('Team Section', () => {
  test('Render Title', () => {
    render(<TeamSection />);

    const title = screen.getByText('Our Team');
    expect(title).toBeInTheDocument();
  });

  test('Render Team', () => {
    render(<TeamSection />);

    team.forEach((person) => {
      expect(screen.getByText(person.name)).toBeInTheDocument();
      expect(screen.getByText(person.github.name)).toBeInTheDocument();
      expect(screen.getByAltText(person.name)).toBeInTheDocument();
    });
  });
});
