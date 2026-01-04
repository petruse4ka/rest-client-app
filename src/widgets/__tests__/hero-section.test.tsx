import { render } from '@/__tests__/test-utils/test-utils';
import { screen } from '@testing-library/react';
import { HeroSection } from '../hero-section';

describe('Test for Hero Section', () => {
  test('Render Title', () => {
    render(<HeroSection user={null} />);

    expect(screen.getByText('REST Client App')).toBeInTheDocument();
  });

  test('Link login user', () => {
    render(<HeroSection user={{ name: 'Test user' }} />);
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
  });

  test('Link logout user', () => {
    render(<HeroSection user={null} />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
