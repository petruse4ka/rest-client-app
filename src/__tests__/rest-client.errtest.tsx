import { screen, waitFor } from '@testing-library/react';
import { render } from './test-utils/test-utils';
import RestClientPage from '@/app/[locale]/rest-client/page';
import React from 'react';
import { describe, test, beforeEach, vi, expect } from 'vitest';
import type { ApiResponse } from '@/types/interfaces';

vi.mock('next/navigation', () => ({
  useParams: () => ({ params: [] }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/features/rest-client', () => ({
  HeadersEditor: () => <div data-testid="headers-editor">Headers Editor</div>,
  BodyEditor: () => <div data-testid="body-editor">Body Editor</div>,
  HttpMethods: ({ loading }: { loading: boolean }) => (
    <div data-testid="http-methods-container">
      <h2>Request</h2>
      <div data-testid="http-methods">
        <div data-testid="method-field">
          <select data-testid="method-select">
            <option value="GET">GET</option>
          </select>
        </div>
        <input data-testid="url-input" placeholder="Enter API endpoint URL" />
        <button data-testid="send-button" disabled={loading}>
          {loading ? 'Loading...' : 'Send'}
        </button>
      </div>
    </div>
  ),
  Response: ({
    loading,
    error,
    response,
  }: {
    loading: boolean;
    error: string | null;
    response: ApiResponse | null;
  }) => (
    <div data-testid="response">
      {loading && <div data-testid="loading-spinner">Loading...</div>}
      {error && <div data-testid="error-card">Error: {error}</div>}
      {response && <div data-testid="response-card">Response: {JSON.stringify(response)}</div>}
    </div>
  ),
}));

vi.mock('@/widgets', () => ({
  CodeGeneration: () => <div data-testid="code-generation">Code Generation</div>,
}));

vi.mock('@/shared/config/firebase', () => {
  return {
    auth: {
      currentUser: null,
    },
  };
});

describe('REST Client Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders page title', async () => {
    render(<RestClientPage />);

    await waitFor(() => {
      expect(screen.getByText('REST Client')).toBeInTheDocument();
    });
  });

  test('renders all main components', async () => {
    render(<RestClientPage />);

    await waitFor(() => {
      expect(screen.getByTestId('method-select')).toBeInTheDocument();
    });
    expect(screen.getByTestId('url-input')).toBeInTheDocument();
    expect(screen.getByTestId('send-button')).toBeInTheDocument();
    expect(screen.getByTestId('headers-editor')).toBeInTheDocument();
    expect(screen.getByTestId('body-editor')).toBeInTheDocument();
  });

  test('form has default values', async () => {
    render(<RestClientPage />);

    await waitFor(() => {
      expect(screen.getByText('GET')).toBeInTheDocument();
    });
  });
});
