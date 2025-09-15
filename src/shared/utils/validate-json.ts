import { ContentType } from '@/types/types';

export const validateJson = (value: string, contentType: ContentType) => {
  if (contentType === ContentType.JSON && value.trim()) {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  } else {
    return true;
  }
};
