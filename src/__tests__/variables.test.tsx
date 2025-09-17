import VariablesPage from '@/app/[locale]/variables/page';
import { render } from './test-utils/test-utils';
import { screen } from '@testing-library/react';
import { describe } from 'vitest';

vi.mock('@/features/editable-table', () => ({
  default: () => <div data-testid="editable-table">Mocked Table</div>,
}));

describe('Variables Page', () => {
  test('Render Title', () => {
    render(<VariablesPage />);
    expect(screen.getByText('Variables')).toBeDefined();
  });

  test('renders EditableTable', () => {
    render(<VariablesPage />);
    expect(screen.getByTestId('editable-table')).toBeInTheDocument();
  });
});
