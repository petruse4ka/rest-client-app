import { VariablesData } from '@/types/types';
import TableControls from '../editable-table/table-controls';
import { render } from '@/__tests__/test-utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';

describe('TableControls', () => {
  const record: VariablesData = { key: 1, variable: 'A', value: '1' };

  test('Renders Save button when editing', () => {
    render(
      <TableControls
        record={record}
        editingKey={1}
        saveItem={vi.fn()}
        editItem={vi.fn()}
        deleteItem={vi.fn()}
      />
    );

    expect(screen.getByLabelText('save')).toBeInTheDocument();
    expect(screen.queryByLabelText('edit')).not.toBeInTheDocument();
  });

  test('Renders Edit button when not editing', () => {
    render(
      <TableControls
        record={record}
        editingKey={0}
        saveItem={vi.fn()}
        editItem={vi.fn()}
        deleteItem={vi.fn()}
      />
    );

    expect(screen.getByLabelText('edit')).toBeInTheDocument();
  });

  test('Disables Edit button when editingKey is not 0', () => {
    render(
      <TableControls
        record={record}
        editingKey={2}
        saveItem={vi.fn()}
        editItem={vi.fn()}
        deleteItem={vi.fn()}
      />
    );

    const editLink = screen.getByLabelText('edit').closest('a');
    expect(editLink).toBeTruthy();

    expect(editLink).toHaveClass('ant-typography-disabled');
  });

  test('Calls saveItem on Save button click', () => {
    const saveItem = vi.fn();

    render(
      <TableControls
        record={record}
        editingKey={1}
        saveItem={saveItem}
        editItem={vi.fn()}
        deleteItem={vi.fn()}
      />
    );

    const saveLink = screen.getByLabelText('save').closest('a');
    if (saveLink) fireEvent.click(saveLink);

    expect(saveItem).toHaveBeenCalledOnce();
    expect(saveItem).toHaveBeenCalledWith(record.key);
  });

  test('Calls editItem on Edit button click', () => {
    const editItem = vi.fn();

    render(
      <TableControls
        record={record}
        editingKey={0}
        saveItem={vi.fn()}
        editItem={editItem}
        deleteItem={vi.fn()}
      />
    );

    const editLink = screen.getByLabelText('edit').closest('a');
    if (editLink) fireEvent.click(editLink);

    expect(editItem).toHaveBeenCalledOnce();
    expect(editItem).toHaveBeenCalledWith(record);
  });

  test('Calls deleteItem on Delete button click', () => {
    const deleteItem = vi.fn();

    render(
      <TableControls
        record={record}
        editingKey={1}
        saveItem={vi.fn()}
        editItem={vi.fn()}
        deleteItem={deleteItem}
      />
    );

    const deleteLink = screen.getByLabelText('delete').closest('a');
    if (deleteLink) fireEvent.click(deleteLink);

    expect(deleteItem).toHaveBeenCalledOnce();
    expect(deleteItem).toHaveBeenCalledWith(record.key);
  });
});
