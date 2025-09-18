import { render } from '@/__tests__/test-utils/test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { localStorageController } from '@/shared/utils';
import EditableTable from '../editable-table';

vi.mock('@/shared/utils', async () => {
  const actual = await vi.importActual('@/shared/utils');
  return {
    ...actual,
    localStorageController: {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn(),
    },
  };
});

const mockedStorage = vi.mocked(localStorageController, true);

describe('EditableTable', () => {
  test('Renders Empty when no data', () => {
    mockedStorage.get.mockReturnValue(null);

    render(<EditableTable />);

    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add new variable' })).toBeEnabled();
  });

  test('Adds a new item and enters editing mode on Add button click', async () => {
    mockedStorage.get.mockReturnValue([]);

    render(<EditableTable />);

    const addButton = screen.getByRole('button', { name: 'Add new variable' });
    fireEvent.click(addButton);

    const input = await screen.findAllByPlaceholderText('Add');
    input.forEach((el) => {
      expect(el).toBeInTheDocument();
    });

    expect(addButton).toBeDisabled();
  });

  test('Renders table rows from stored data', () => {
    mockedStorage.get.mockReturnValue([
      { key: 1, variable: 'var1', value: 'val1' },
      { key: 2, variable: 'var2', value: 'val2' },
    ]);

    render(<EditableTable />);

    expect(screen.getByText('var1')).toBeInTheDocument();
    expect(screen.getByText('val1')).toBeInTheDocument();
    expect(screen.getByText('var2')).toBeInTheDocument();
    expect(screen.getByText('val2')).toBeInTheDocument();
  });

  test('Deletes an item', async () => {
    mockedStorage.get.mockReturnValue([{ key: 1, variable: 'var1', value: 'val1' }]);

    render(<EditableTable />);

    const deleteButton = await screen.findByLabelText('delete');

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText('No data')).toBeInTheDocument();
    });

    expect(mockedStorage.remove).toHaveBeenCalledWith('rest-variables');
  });

  test('Saves changes and exits editing mode', async () => {
    mockedStorage.get.mockReturnValue([{ key: 1, variable: 'var1', value: 'val1' }]);

    render(<EditableTable />);

    const editButton = await screen.findByLabelText('edit');
    fireEvent.click(editButton);

    const input = await screen.findByDisplayValue('var1');
    fireEvent.change(input, { target: { value: 'var1-updated' } });

    const saveButton = await screen.findByLabelText('save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByDisplayValue('var1-updated')).not.toBeInTheDocument();
      expect(screen.getByText('var1-updated')).toBeInTheDocument();
    });
  });
});
