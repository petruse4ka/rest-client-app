import { render } from '@/__tests__/test-utils/test-utils';
import { screen } from '@testing-library/react';
import { HeroSection } from '../hero-section';

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback(null);
    return () => {};
  }),
}));

vi.mock('@/shared/config/firebase', () => {
  return {
    auth: {
      currentUser: null,
    },
  };
});

describe('Test for Hero Section', () => {
  test('Render', () => {
    render(<HeroSection />);

    expect(screen.getByText('REST Client App')).toBeInTheDocument();
  });
});
