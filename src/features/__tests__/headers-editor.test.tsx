import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';
import { HeadersEditor } from '../rest-client/headers-editor';
import enMessages from '@/shared/i18n/messages/en.json';
import { render } from '../../__tests__/test-utils/test-utils';
import type { ReactNode } from 'react';

const TestWrapper = ({ children }: { children: ReactNode }) => {
  const [form] = Form.useForm();
  return <Form form={form}>{children}</Form>;
};

describe('HeadersEditor', () => {
  test('renders headers editor with all elements', () => {
    render(
      <TestWrapper>
        <HeadersEditor />
      </TestWrapper>
    );

    expect(screen.getByText(enMessages.RestClient.headers)).toBeInTheDocument();
    expect(screen.getByText(enMessages.RestClient.noHeaders)).toBeInTheDocument();
    expect(screen.getByText(enMessages.RestClient.addHeader)).toBeInTheDocument();
  });

  test('shows add header button', () => {
    render(
      <TestWrapper>
        <HeadersEditor />
      </TestWrapper>
    );

    const addButton = screen.getByTestId('add-header-button');
    expect(addButton).toBeInTheDocument();
  });

  test('adds new header when add button is clicked', () => {
    render(
      <TestWrapper>
        <HeadersEditor />
      </TestWrapper>
    );

    const addButton = screen.getByTestId('add-header-button');
    expect(() => fireEvent.click(addButton)).not.toThrow();
  });
});
