import { render } from '@/__tests__/test-utils/test-utils';
import { screen } from '@testing-library/react';
import { AboutCourseSection } from '../about-course-section';

vi.mock('@/shared/i18n/navigation', () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
    }),
  };
});

describe('Test for About Courses Section', () => {
  test('Render', () => {
    render(<AboutCourseSection />);

    expect(screen.getByText('About Course')).toBeInTheDocument();
    expect(
      screen.getByText('This web application was created during a React course at RSSchool.')
    ).toBeInTheDocument();
    expect(screen.getByText('Course website')).toBeInTheDocument();
  });
});
