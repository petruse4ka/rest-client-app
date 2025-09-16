import { ContentType } from '@/types/types';
import { JSON_PLACEHOLDER, XML_PLACEHOLDER } from '@/shared/constants';

export const getBodyPlaceholder = (contentType: ContentType, defaultPlaceholder: string) => {
  switch (contentType) {
    case 'json':
      return JSON_PLACEHOLDER;
    case 'xml':
      return XML_PLACEHOLDER;
    default:
      return defaultPlaceholder;
  }
};
