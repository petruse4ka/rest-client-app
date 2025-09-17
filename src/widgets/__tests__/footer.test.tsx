import { render } from '@/__tests__/test-utils/test-utils';
import { FooterApp } from '../footer';
import { screen } from '@testing-library/react';
import { authorLinks } from '@/shared/config';

describe('Footer', () => {
  test('Render RSS Logo and date', () => {
    render(<FooterApp />);

    const rssLink = screen.getByRole('link', { name: /rss logo/i });
    expect(rssLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');

    const rssImage = screen.getByAltText('RSS Logo');
    expect(rssImage).toBeInTheDocument();

    expect(screen.getByText('© 2025')).toBeInTheDocument();
  });

  test('Render Author', () => {
    render(<FooterApp />);

    authorLinks.forEach(({ href, label }) => {
      const linkText = screen.getByText(label.split(' ')[0]);
      const link = linkText.closest('a');
      expect(link).toHaveAttribute('href', href);
    });
  });
});
