import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from './test-utils/test-utils';
import RestClientPage from '@/app/[locale]/rest-client/page';
import enMessages from '@/shared/i18n/messages/en.json';
import axios from 'axios';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('REST Client Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all components with test IDs', () => {
    render(<RestClientPage />);

    expect(screen.getByTestId('rest-client-title')).toBeInTheDocument();
    expect(screen.getByTestId('method-select')).toBeInTheDocument();
    expect(screen.getByTestId('url-input')).toBeInTheDocument();
    expect(screen.getByTestId('send-button')).toBeInTheDocument();
  });

  test('displays translated content', () => {
    render(<RestClientPage />);

    expect(screen.getByText(enMessages.RestClient.title)).toBeInTheDocument();
    expect(screen.getByText(enMessages.RestClient.method)).toBeInTheDocument();
    expect(screen.getByText(enMessages.RestClient.url)).toBeInTheDocument();
    expect(screen.getByText(enMessages.RestClient.sendRequest)).toBeInTheDocument();
  });

  test('form has pre-filled values', () => {
    render(<RestClientPage />);

    const methodSelect = screen.getByTestId('method-select');
    expect(methodSelect).toHaveTextContent('GET');
  });

  test('send button is clickable', () => {
    render(<RestClientPage />);

    const sendButton = screen.getByTestId('send-button');
    expect(sendButton).not.toBeDisabled();
    expect(() => fireEvent.click(sendButton)).not.toThrow();
  });

  test('shows loading state when request is sent', async () => {
    mockedAxios.post.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                data: { data: { test: 'response' }, status: 200, statusText: 'OK' },
              }),
            1000
          )
        )
    );

    render(<RestClientPage />);

    const urlInput = screen.getByTestId('url-input');
    fireEvent.change(urlInput, { target: { value: 'https://api.example.com/test' } });

    const sendButton = screen.getByTestId('send-button');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getAllByTestId('loading-spinner')).toHaveLength(2);
    });
  });

  test('displays response when request succeeds', async () => {
    const mockResponse = {
      data: { data: { test: 'response' }, status: 200, statusText: 'OK' },
    };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<RestClientPage />);

    const urlInput = screen.getByTestId('url-input');
    fireEvent.change(urlInput, { target: { value: 'https://api.example.com/test' } });

    const sendButton = screen.getByTestId('send-button');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByTestId('response-card')).toBeInTheDocument();
      expect(screen.getByText(enMessages.RestClient.response)).toBeInTheDocument();
    });
  });

  test('displays error when request fails', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Network error'));

    render(<RestClientPage />);

    const urlInput = screen.getByTestId('url-input');
    fireEvent.change(urlInput, { target: { value: 'https://api.example.com/test' } });

    const sendButton = screen.getByTestId('send-button');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByTestId('error-card')).toBeInTheDocument();
      expect(screen.getByText(enMessages.RestClient.error)).toBeInTheDocument();
    });
  });

  test('displays error when API returns error field in response', async () => {
    const mockResponse = {
      data: { error: 'API returned an error message' },
    };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<RestClientPage />);

    const urlInput = screen.getByTestId('url-input');
    fireEvent.change(urlInput, { target: { value: 'https://api.example.com/test' } });

    const sendButton = screen.getByTestId('send-button');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByTestId('error-card')).toBeInTheDocument();
      expect(screen.getByText(enMessages.RestClient.error)).toBeInTheDocument();
      expect(screen.getByDisplayValue('API returned an error message')).toBeInTheDocument();
    });
  });
});
