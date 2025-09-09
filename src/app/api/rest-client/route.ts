'use server';

import { RequestBody } from '@/types/interfaces';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const { method, url, headers = {}, data } = (await request.json()) as RequestBody;

    const response = await axios({
      method,
      url,
      headers: {
        'User-Agent': 'REST-Client-App/1.0',
        Accept: 'application/json',
        ...headers,
      },
      data,
    });

    return NextResponse.json({
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({
        data: error.response?.data || null,
        status: error.response?.status || 500,
        statusText: error.response?.statusText || 'Internal Server Error',
      });
    }

    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
}
