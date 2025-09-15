import { RequestHistoryItem } from '@/app/[locale]/history/request-history.type';

export function sortByTimestamp(items: RequestHistoryItem[]): RequestHistoryItem[] {
  return [...items].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}
