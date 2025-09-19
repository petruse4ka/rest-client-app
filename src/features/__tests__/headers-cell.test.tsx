import { render, screen, fireEvent } from '@testing-library/react';
import HeadersCell from '../rest-client/headers-cell';
import { Form } from 'antd';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('HeadersCell', () => {
  test('renders input with placeholder', () => {
    const mockOnChange = vi.fn();

    render(
      <Form>
        <HeadersCell
          value="test-value"
          onChange={mockOnChange}
          placeholder="Enter header key"
          dataIndex="key"
        />
      </Form>
    );

    expect(screen.getByPlaceholderText('Enter header key')).toBeInTheDocument();
  });

  test('calls onChange when input value changes', () => {
    const mockOnChange = vi.fn();

    render(
      <Form>
        <HeadersCell
          value=""
          onChange={mockOnChange}
          placeholder="Enter header value"
          dataIndex="value"
        />
      </Form>
    );

    const input = screen.getByPlaceholderText('Enter header value');
    fireEvent.change(input, { target: { value: 'new-value' } });

    expect(mockOnChange).toHaveBeenCalledWith('new-value');
  });

  test('displays initial value', () => {
    const mockOnChange = vi.fn();

    render(
      <Form>
        <HeadersCell
          value="initial-value"
          onChange={mockOnChange}
          placeholder="Enter header key"
          dataIndex="key"
        />
      </Form>
    );

    expect(screen.getByDisplayValue('initial-value')).toBeInTheDocument();
  });
});
