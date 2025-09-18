import { PersonCard } from '../UI';
import { render } from '@/__tests__/test-utils/test-utils';
import { screen } from '@testing-library/react';
import { team } from '../config/team';

describe('Person Card', () => {
  test('Render Person Card', () => {
    render(<PersonCard person={team[0]} />);

    expect(screen.getByText(team[0].name)).toBeInTheDocument();
    expect(screen.getByText(team[0].github.name)).toBeInTheDocument();
    expect(screen.getByAltText(team[0].name)).toBeInTheDocument();
  });
});
