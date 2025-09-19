import { render, screen } from '@testing-library/react';
import { ClientLoader } from '@/shared/UI';
import { describe, test, expect } from 'vitest';

describe('ClientLoader', () => {
  test('renders children after mounting', () => {
    render(
      <ClientLoader>
        <div data-testid="content">Test Content</div>
      </ClientLoader>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
