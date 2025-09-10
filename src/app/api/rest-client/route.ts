'use server';

import { RequestBody } from '@/types/interfaces';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import getReadableErrorMessage from '@/shared/utils/get-readable-error-message';

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
    if (axios.isAxiosError(error) && error.response !== undefined) {
      return NextResponse.json({
        data: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
      });
    }

    return NextResponse.json({
      error: getReadableErrorMessage(error),
    });
  }
}
