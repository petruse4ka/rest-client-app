import { POST } from '@/app/api/rest-client/route';
import { NextRequest } from 'next/server';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('REST Client API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('handles different HTTP methods', async () => {
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

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
    mockedAxios.mockRejectedValue(error);

    const request = new NextRequest('http://localhost:3000/api/rest-client', {
      method: 'POST',
      body: JSON.stringify({
        method: 'GET',
        url: 'https://api.example.com/test',
      }),
    });

    await expect(POST(request)).rejects.toThrow('Network error');
  });
});
