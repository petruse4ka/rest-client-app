import { screen } from '@testing-library/react';
import { Form } from 'antd';
import { HttpMethods } from '../rest-client/http-methods';
import enMessages from '@/shared/i18n/messages/en.json';
import { render } from '@/__tests__/test-utils/test-utils';
import type { ReactNode } from 'react';

vi.mock('@/shared/i18n/navigation', () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
    }),
  };
});

vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  const mockUseBreakpoint = vi.fn(() => ({ md: true }));

  return {
    ...actual,
    Grid: {
      useBreakpoint: mockUseBreakpoint,
    },
  };
});

const TestWrapper = ({ children }: { children: ReactNode }) => {
  const [form] = Form.useForm();
  return <Form form={form}>{children}</Form>;
};

describe('HttpMethods', () => {
  test('applies correct margin and alignment styles depending on screen size', () => {
    render(
      <TestWrapper>
        <HttpMethods loading={false} />
      </TestWrapper>
    );

    const flexContainer = screen.getByTestId('http-methods-container');
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveStyle('margin-bottom: 24px');
  });

  test('renders with default medium screen behavior', () => {
    render(
      <TestWrapper>
        <HttpMethods loading={false} />
      </TestWrapper>
    );

    const flexContainer = screen.getByTestId('http-methods-container');
    expect(flexContainer).toHaveClass('ant-flex-gap-middle');
  });

  test('applies correct method field styling for medium screens', () => {
    const { container } = render(
      <TestWrapper>
        <HttpMethods loading={false} />
      </TestWrapper>
    );

    const methodField = container.querySelector('.ant-form-item[style*="flex: 0 0 auto"]');
    expect(methodField).toBeInTheDocument();
    expect(methodField).toHaveStyle({
      'min-width': '115px',
    });
  });

  test('shows button text for medium screens', () => {
    render(
      <TestWrapper>
        <HttpMethods loading={false} />
      </TestWrapper>
    );

    const sendButton = screen.getByTestId('send-button');
    expect(sendButton).toHaveTextContent(enMessages.RestClient.sendRequest);
  });
});
