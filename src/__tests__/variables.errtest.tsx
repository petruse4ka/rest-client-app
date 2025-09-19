import VariablesPage from '@/app/[locale]/variables/page';
import { render, waitFor } from './test-utils/test-utils';
import { screen } from '@testing-library/react';

vi.mock('@/features/editable-table', () => ({
  default: () => <div data-testid="editable-table">Mocked Table</div>,
}));

describe('Variables Page', () => {
  test('Render Title', async () => {
    render(<VariablesPage />);

    await waitFor(() => {
      expect(screen.getByText('Variables')).toBeInTheDocument();
    });
  });

  test('renders EditableTable', async () => {
    render(<VariablesPage />);

    await waitFor(() => {
      expect(screen.getByTestId('editable-table')).toBeInTheDocument();
    });
  });
});
