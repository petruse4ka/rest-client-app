'use server';

import { RequestBody } from '@/types/interfaces';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const { method, url } = (await request.json()) as RequestBody;

  const response = await axios({
    method,
    url,
    headers: {
      'User-Agent': 'REST-Client-App/1.0',
      Accept: 'application/json',
    },
  });

  return NextResponse.json({
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  });
}
