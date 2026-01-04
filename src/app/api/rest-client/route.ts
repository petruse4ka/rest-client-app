'use server';

import { RequestBody } from '@/types/interfaces';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getReadableErrorMessage } from '@/shared/utils';

export async function POST(request: NextRequest) {
  try {
    const { method, url, headers = {}, data } = (await request.json()) as RequestBody;

    const {
      data: responseData,
      status,
      statusText,
    } = await axios({
      method,
      url,
      headers,
      data,
    });

    return NextResponse.json({
      data: responseData,
      status,
      statusText,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response !== undefined) {
      const { data, status, statusText } = error.response;

      return NextResponse.json({
        data,
        status,
        statusText,
      });
    }

    return NextResponse.json({
      error: getReadableErrorMessage(error),
    });
  }
}
