import { ContentType } from '@/types/types';

export const prettifyJson = (value: string, contentType: ContentType): string | null => {
  if (contentType === ContentType.JSON && value.trim()) {
    try {
      const parsedValue = JSON.parse(value);
      return JSON.stringify(parsedValue, null, 2);
    } catch (error) {
      return null;
    }
  }
  return value;
};
