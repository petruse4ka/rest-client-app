import { render } from '@/__tests__/test-utils/test-utils';
import { screen } from '@testing-library/react';
import { HeroSection } from '../hero-section';
import { navLinks } from '@/shared/config';
import { authLinks } from '@/shared/config/navigation';
import { useTranslations } from 'next-intl';

const mockUseAuth = vi.fn(() => ({ isLogin: false }));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback(null);
    return () => {};
  }),
}));

vi.mock('@/shared/provider/auth-provider', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => mockUseAuth(),
}));

describe('Test for Hero Section', () => {
  test('Render Title', () => {
    render(<HeroSection />);

    expect(screen.getByText('REST Client App')).toBeInTheDocument();
  });

  test('Link login user', () => {
    mockUseAuth.mockReturnValue({ isLogin: true });

    render(<HeroSection />);
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
  });

  test('Link logout user', () => {
    mockUseAuth.mockReturnValue({ isLogin: false });

    render(<HeroSection />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
