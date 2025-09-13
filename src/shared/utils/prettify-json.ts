import { ContentType } from '@/types/types';

export const prettifyJson = (
  value: string,
  contentType: ContentType,
  handleJsonChange: (value: string, contentType: ContentType) => void,
  setComponentState: (value: boolean) => void
) => {
  if (contentType === ContentType.JSON && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      const prettified = JSON.stringify(parsed, null, 2);
      handleJsonChange(prettified, contentType);
      setComponentState(true);
    } catch (error) {
      setComponentState(false);
    }
  }
};
