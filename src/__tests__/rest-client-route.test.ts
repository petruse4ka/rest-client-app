import { POST } from '@/app/api/rest-client/route';
import { NextRequest } from 'next/server';
import axios, { AxiosError, AxiosHeaders } from 'axios';
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

  test('handles axios errors without response', async () => {
    const error = new Error('Network error');
    // Mock axios.isAxiosError to return true, but error has no response property

    vi.mocked(axios.isAxiosError).mockReturnValue(true);
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

    expect(responseData.error).toBe('Network error. Please check your internet connection.');
  });

  test('handles DNS errors with readable message', async () => {
    const error = new Error('getaddrinfo ENOTFOUND api.unspsdflash.com');
    // Mock axios.isAxiosError to return true, but error has no response property

    vi.mocked(axios.isAxiosError).mockReturnValue(true);
    mockedAxios.mockImplementation(() => Promise.reject(error));

    const request = new NextRequest('http://localhost:3000/api/rest-client', {
      method: 'POST',
      body: JSON.stringify({
        method: 'GET',
        url: 'https://api.unspsdflash.com/test',
      }),
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(responseData.error).toBe(
      'Unable to connect to the server. Please check the URL and try again.'
    );
  });

  test('handles axios errors with response (4xx/5xx)', async () => {
    const axiosError = new AxiosError('Request failed with status code 404');
    axiosError.response = {
      status: 404,
      statusText: 'Not Found',
      data: { error: 'Resource not found' },
      headers: new AxiosHeaders(),
      config: {
        url: 'https://api.example.com/test',
        method: 'GET',
        headers: new AxiosHeaders(),
      },
    };

    vi.mocked(axios.isAxiosError).mockReturnValue(true);
    mockedAxios.mockImplementation(() => Promise.reject(axiosError));

    const request = new NextRequest('http://localhost:3000/api/rest-client', {
      method: 'POST',
      body: JSON.stringify({
        method: 'GET',
        url: 'https://api.example.com/test',
      }),
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(responseData.data).toEqual({ error: 'Resource not found' });
    expect(responseData.status).toBe(404);
    expect(responseData.statusText).toBe('Not Found');
  });
});
