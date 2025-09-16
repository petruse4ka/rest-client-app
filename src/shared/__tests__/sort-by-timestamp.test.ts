import { describe, test, expect } from 'vitest';
import { sortByTimestamp } from '@/shared/utils/sort-by-timestamp';
import type { RequestHistoryItem } from '@/app/[locale]/history/request-history.type';

const makeItem = (id: string, timestamp: string): RequestHistoryItem => ({
  id,
  timestamp,
  url: '/api/test',
  method: 'GET',
  durationMs: 100,
  statusCode: 200,
  requestSize: 10,
  responseSize: 20,
});

describe('sortByTimestamp', () => {
  test('sorts items by timestamp descending (latest first)', () => {
    const items = [
      makeItem('1', '2024-01-01T10:00:00Z'),
      makeItem('2', '2024-03-01T10:00:00Z'),
      makeItem('3', '2024-02-01T10:00:00Z'),
    ];

    const sorted = sortByTimestamp(items);
    expect(sorted.map((i) => i.id)).toEqual(['2', '3', '1']);
  });

  test('does not mutate original array', () => {
    const items = [makeItem('1', '2024-01-01T10:00:00Z')];
    const copy = [...items];
    sortByTimestamp(items);
    expect(items).toEqual(copy);
  });

  test('handles empty array', () => {
    expect(sortByTimestamp([])).toEqual([]);
  });

  test('handles items with same timestamp', () => {
    const items = [makeItem('a', '2024-05-01T00:00:00Z'), makeItem('b', '2024-05-01T00:00:00Z')];
    const sorted = sortByTimestamp(items);
    expect(sorted.map((i) => i.id).sort()).toEqual(['a', 'b']);
  });
});
