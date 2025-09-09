import { POST } from '@/app/api/rest-client/route';
import { NextRequest } from 'next/server';
import { vi } from 'vitest';
import axios from 'axios';
import { HttpMethod } from '@/types/types';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('REST Client API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('handles different HTTP methods', async () => {
    const methods = [...Object.values(HttpMethod)];

    for (const method of methods) {
      mockedAxios.mockResolvedValue({
        data: { method },
        status: 200,
        statusText: 'OK',
      });

      const request = new NextRequest('http://localhost:3000/api/rest-client', {
        method: 'POST',
        body: JSON.stringify({
          method,
          url: 'https://api.example.com/test',
        }),
      });

      await POST(request);

      expect(mockedAxios).toHaveBeenCalledWith({
        method,
        url: 'https://api.example.com/test',
        headers: {
          'User-Agent': 'REST-Client-App/1.0',
          Accept: 'application/json',
        },
      });
    }
  });

  test('handles axios errors', async () => {
    const error = new Error('Network error');
    mockedAxios.mockImplementation(() => Promise.reject(error));

    const request = new NextRequest('http://localhost:3000/api/rest-client', {
      method: 'POST',
      body: JSON.stringify({
        method: 'GET',
        url: 'https://api.example.com/test',
      }),
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(responseData.error).toBe('Network error');
    expect(responseData.status).toBe(500);
    expect(responseData.statusText).toBe('Internal Server Error');
    expect(responseData.data).toBe(null);
  });

  test('handles JSON parsing errors', async () => {
    const request = new NextRequest('http://localhost:3000/api/rest-client', {
      method: 'POST',
      body: 'invalid json{',
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(responseData.error).toBe('Invalid JSON in request body');
    expect(responseData.status).toBe(400);
    expect(responseData.statusText).toBe('Bad Request');
    expect(responseData.data).toBe(null);
  });

  test('handles TypeError errors', async () => {
    mockedAxios.mockImplementation(() => {
      throw new TypeError('Invalid request data format');
    });

    const request = new NextRequest('http://localhost:3000/api/rest-client', {
      method: 'POST',
      body: JSON.stringify({
        method: 'GET',
        url: 'https://api.example.com/test',
      }),
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(responseData.error).toBe('Invalid request data format');
    expect(responseData.status).toBe(400);
    expect(responseData.statusText).toBe('Bad Request');
    expect(responseData.data).toBe(null);
  });

  test('handles unknown errors', async () => {
    mockedAxios.mockImplementation(() => {
      throw 'Unknown error';
    });

    const request = new NextRequest('http://localhost:3000/api/rest-client', {
      method: 'POST',
      body: JSON.stringify({
        method: 'GET',
        url: 'https://api.example.com/test',
      }),
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(responseData.error).toBe('Unknown error occurred');
    expect(responseData.status).toBe(500);
    expect(responseData.statusText).toBe('Internal Server Error');
    expect(responseData.data).toBe(null);
  });
});
