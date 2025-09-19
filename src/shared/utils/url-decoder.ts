import { Header, DecodedUrlData } from '@/types/interfaces';
import { HttpMethod } from '@/types/types';

export function decodeRestClientUrl(
  urlParts: string[],
  searchParams: URLSearchParams
): DecodedUrlData | null {
  try {
    if (urlParts.length < 1) {
      return null;
    }

    const method = urlParts[0] as HttpMethod;
    const encodedUrl = urlParts[1];
    const encodedBody = urlParts[2];

    const urlDecoded = encodedUrl ? decodeURIComponent(encodedUrl) : '';
    const bodyDecoded = encodedBody ? decodeURIComponent(encodedBody) : '';

    const url = urlDecoded ? atob(urlDecoded) : '';
    const body = bodyDecoded ? atob(bodyDecoded) : '';

    const headers: Header[] = [];
    searchParams.forEach((value, key) => {
      if (key && value) {
        headers.push({ id: Date.now() + Math.random(), key, value });
      }
    });

    const data = {
      method,
      url,
      body: body || undefined,
      headers: headers.length > 0 ? headers : [],
    };

    return data;
  } catch {
    return null;
  }
}
