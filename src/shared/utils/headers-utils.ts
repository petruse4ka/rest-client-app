import type { Header } from '@/types/interfaces';

export function getInvalidHeaders(headers: Header[]): Header[] {
  return headers.filter(({ key, value }) => {
    const keyTrim = key.trim();
    const valueTrim = value.trim();

    return (keyTrim && !valueTrim) || (!keyTrim && valueTrim);
  });
}

export function headersArrayToObject(headers: Header[]): Record<string, string> {
  return headers.reduce(
    (acc, { key, value }) => {
      const keyTrim = key.trim();
      const valueTrim = value.trim();

      if (keyTrim && valueTrim) {
        acc[keyTrim] = valueTrim;
      }

      return acc;
    },
    {} as Record<string, string>
  );
}
