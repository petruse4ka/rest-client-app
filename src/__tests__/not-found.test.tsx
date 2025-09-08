import { screen, fireEvent } from '@testing-library/react';
import { render } from './test-utils/test-utils';
import NotFound from '@/app/[locale]/not-found';
import enMessages from '@/shared/i18n/messages/en.json';

describe('NotFound Page', () => {
  test('renders all components with test IDs', () => {
    render(<NotFound />);

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

  test('displays translated content', () => {
    render(<NotFound />);

    expect(screen.getByText(enMessages.NotFound.title)).toBeInTheDocument();
    expect(screen.getByText(enMessages.NotFound.tryAnotherMessage)).toBeInTheDocument();
    expect(screen.getByText(enMessages.NotFound.returnToHomepage)).toBeInTheDocument();
  });

  test('displays one of the random messages', () => {
    render(<NotFound />);

    const messageElement = screen.getByTestId('not-found-message');
    const messageText = messageElement.textContent;

    expect(enMessages.NotFound.messages).toContain(messageText);
  });
});
