import { DEFAULT_HEADERS } from '@/shared/constants';
import { decodeRestClientUrl } from './url-decoder';
import { ContentType, HttpMethod } from '@/types/types';

export function getInitialFormValues(urlParts: string[], searchParams: URLSearchParams) {
  if (urlParts.length > 0) {
    const decodedData = decodeRestClientUrl(urlParts, searchParams);

    if (decodedData) {
      const { method, url, headers, body } = decodedData;

      return {
        method,
        url,
        headers: headers.length > 0 ? headers : DEFAULT_HEADERS,
        data: body || '',
        contentType: ContentType.JSON,
      };
    }
  }

  return {
    method: HttpMethod.GET,
    url: '',
    headers: DEFAULT_HEADERS,
    data: '',
    contentType: ContentType.JSON,
  };
}
