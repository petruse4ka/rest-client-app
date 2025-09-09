import { render } from '@/__tests__/test-utils/test-utils';
import { screen } from '@testing-library/react';
import { HeroSection } from '../hero-section';

describe('Test for Hero Section', () => {
  test('Render', () => {
    render(<HeroSection />);

    expect(screen.getByText('REST Client App')).toBeInTheDocument();
  });
});
