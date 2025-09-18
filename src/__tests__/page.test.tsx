import Home from '@/app/[locale]/page';
import { screen } from '@testing-library/react';
import { render } from './test-utils/test-utils';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
}));

describe('Home', () => {
  test('Render page', () => {
    render(<Home />);
    const contentContainer = screen.getByRole('main');
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveClass('bg-animate');
  });

  test('Render sections', () => {
    render(<Home />);
    expect(screen.getByText('REST Client App')).toBeInTheDocument();
    expect(screen.getByText('Our Team')).toBeInTheDocument();
    expect(screen.getByText('About Course')).toBeInTheDocument();
  });
});
