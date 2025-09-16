import { RequestBody, Header } from '@/types/interfaces';

export function encodeRestClientUrl(formData: RequestBody): string {
  const { method, url, headers, data } = formData;

  const base64Url = btoa(url);
  const encodedUrl = encodeURIComponent(base64Url);
  const pathParts = ['rest-client', method, encodedUrl];

  if (data?.trim()) {
    const base64Body = btoa(data.trim());
    const encodedBody = encodeURIComponent(base64Body);
    pathParts.push(encodedBody);
  }

  const urlPath = `/${pathParts.join('/')}`;

  const queryParams = new URLSearchParams();
  const headersArray = Array.isArray(headers) ? headers : [];

  headersArray.forEach(({ key, value }: Header) => {
    const keyTrim = key.trim();
    const valueTrim = value.trim();

    if (keyTrim && valueTrim) {
      queryParams.append(keyTrim, valueTrim);
    }
  });

  const queryParamsString = queryParams.toString();

  return `${urlPath}${queryParamsString ? `?${queryParamsString}` : ''}`;
}
