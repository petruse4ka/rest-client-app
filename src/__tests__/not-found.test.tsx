import { render, screen, fireEvent } from '@testing-library/react';
import NotFound from '@/app/not-found';

describe('NotFound Page', () => {
  test('renders all components with test IDs', () => {
    render(<NotFound />);

    expect(screen.getByTestId('not-found-layout')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-content')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-title')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-logo')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-message')).toBeInTheDocument();
    expect(screen.getByTestId('random-message-button')).toBeInTheDocument();
    expect(screen.getByTestId('homepage-button')).toBeInTheDocument();
    expect(screen.getByTestId('homepage-link')).toBeInTheDocument();
  });

  test('buttons are clickable', () => {
    render(<NotFound />);

    const randomButton = screen.getByTestId('random-message-button');
    const homepageButton = screen.getByTestId('homepage-button');

    expect(randomButton).not.toBeDisabled();
    expect(homepageButton).not.toBeDisabled();

    expect(() => fireEvent.click(randomButton)).not.toThrow();
    expect(() => fireEvent.click(homepageButton)).not.toThrow();
  });
});
