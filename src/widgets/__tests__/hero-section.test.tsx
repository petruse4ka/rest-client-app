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

vi.mock('@/shared/i18n/navigation', () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
    }),
  };
});

describe('Test for Hero Section', () => {
  test('Render', () => {
    render(<HeroSection />);

    expect(screen.getByText('REST Client App')).toBeInTheDocument();
  });
});
