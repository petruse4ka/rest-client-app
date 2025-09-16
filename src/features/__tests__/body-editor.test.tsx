import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';
import { BodyEditor } from '../rest-client/body-editor';
import { ContentType } from '@/types/types';
import enMessages from '@/shared/i18n/messages/en.json';
import { render } from '@/__tests__/test-utils/test-utils';
import { validateJson } from '@/shared/utils';
import type { ReactNode } from 'react';

vi.mock('@/shared/utils', async () => {
  const actual = await vi.importActual('@/shared/utils');
  return {
    ...actual,
    validateJson: vi.fn(() => true),
  };
});

vi.mock('@/shared/i18n/navigation', () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
    }),
  };
});

const mockedValidateJson = vi.mocked(validateJson);

const TestWrapper = ({ children }: { children: ReactNode }) => {
  const [form] = Form.useForm();
  return <Form form={form}>{children}</Form>;
};

describe('BodyEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders body editor with all elements', () => {
    render(
      <TestWrapper>
        <BodyEditor />
      </TestWrapper>
    );

    expect(screen.getByText(enMessages.RestClient.body)).toBeInTheDocument();
    expect(screen.getByText(enMessages.RestClient.prettify)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('shows prettify button for JSON content type', () => {
    render(
      <TestWrapper>
        <BodyEditor />
      </TestWrapper>
    );

    const prettifyButton = screen.getByTestId('prettify-button');
    expect(prettifyButton).toBeInTheDocument();
  });

  test('handles text area input change', () => {
    render(
      <TestWrapper>
        <BodyEditor />
      </TestWrapper>
    );

    const textArea = screen.getByTestId('body-textarea');
    fireEvent.change(textArea, { target: { value: '{"test": "value"}' } });

    expect(mockedValidateJson).toHaveBeenCalledWith('{"test": "value"}', ContentType.JSON);
  });

  test('prettify button is present and clickable', () => {
    render(
      <TestWrapper>
        <BodyEditor />
      </TestWrapper>
    );

    const prettifyButton = screen.getByTestId('prettify-button');
    expect(prettifyButton).toBeInTheDocument();
    expect(() => fireEvent.click(prettifyButton)).not.toThrow();
  });

  test('shows danger text when JSON is invalid', () => {
    mockedValidateJson.mockReturnValue(false);

    render(
      <TestWrapper>
        <BodyEditor />
      </TestWrapper>
    );

    const textArea = screen.getByTestId('body-textarea');
    fireEvent.change(textArea, { target: { value: '{"invalid": json}' } });

    expect(screen.getByTestId('invalid-json-error')).toBeInTheDocument();
  });

  test('shows red border when JSON is invalid', () => {
    mockedValidateJson.mockReturnValue(false);

    render(
      <TestWrapper>
        <BodyEditor />
      </TestWrapper>
    );

    const textArea = screen.getByTestId('body-textarea');
    fireEvent.change(textArea, { target: { value: '{"invalid": json}' } });

    expect(textArea).toHaveStyle('border-color: #ff4d4f');
  });
});
