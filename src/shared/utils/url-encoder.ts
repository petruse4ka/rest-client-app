import { RequestBody } from '@/types/interfaces';
import { ContentType } from '@/types/types';
import { prettifyJson } from './prettify-json';

function safeBtoa(str: string): string {
  try {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );
  } catch (error) {
    const safeStr = str.replace(/[^\x00-\x7F]/g, '?');
    return btoa(safeStr);
  }
}

export function encodeRestClientUrl(formData: RequestBody): string {
  const { method, url, headers, data } = formData;

  const base64Url = safeBtoa(url);
  const encodedUrl = encodeURIComponent(base64Url);
  const pathParts = ['rest-client', method, encodedUrl];

  if (data?.trim()) {
    const stringifiedData = prettifyJson(data.trim(), ContentType.JSON) || data.trim();
    const base64Body = safeBtoa(stringifiedData);
    const encodedBody = encodeURIComponent(base64Body);
    pathParts.push(encodedBody);
  }

  const urlPath = `/${pathParts.join('/')}`;

  const queryParams = new URLSearchParams();

  if (headers && typeof headers === 'object') {
    Object.entries(headers).forEach(([key, value]) => {
      const keyTrim = key.trim();
      const valueTrim = value.trim();

      if (keyTrim && valueTrim) {
        queryParams.append(keyTrim, valueTrim);
      }
    });
  }

  const queryParamsString = queryParams.toString();

  return `${urlPath}${queryParamsString ? `?${queryParamsString}` : ''}`;
}
