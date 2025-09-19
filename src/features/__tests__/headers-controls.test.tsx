import { render, screen, fireEvent } from '@testing-library/react';
import HeadersControls from '../rest-client/headers-controls';

describe('HeadersControls', () => {
  test('renders delete button', () => {
    const mockDeleteItem = vi.fn();

    render(<HeadersControls deleteItem={mockDeleteItem} />);

    expect(screen.getByLabelText('delete')).toBeInTheDocument();
  });

  test('calls deleteItem when clicked', () => {
    const mockDeleteItem = vi.fn();

    render(<HeadersControls deleteItem={mockDeleteItem} />);

    const deleteButton = screen.getByLabelText('delete');
    fireEvent.click(deleteButton);

    expect(mockDeleteItem).toHaveBeenCalledTimes(1);
  });

  test('displays delete icon', () => {
    const mockDeleteItem = vi.fn();

    render(<HeadersControls deleteItem={mockDeleteItem} />);

    expect(screen.getByLabelText('delete')).toBeInTheDocument();
  });
});
