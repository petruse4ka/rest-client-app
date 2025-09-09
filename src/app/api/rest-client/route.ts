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
        error: error.message,
        status: error.response?.status || 500,
        statusText: error.response?.statusText || 'Internal Server Error',
        data: error.response?.data || null,
      });
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json({
        error: 'Invalid JSON in request body',
        status: 400,
        statusText: 'Bad Request',
        data: null,
      });
    }

    if (error instanceof TypeError) {
      return NextResponse.json({
        error: 'Invalid request data format',
        status: 400,
        statusText: 'Bad Request',
        data: null,
      });
    }

    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 500,
      statusText: 'Internal Server Error',
      data: null,
    });
  }
}
