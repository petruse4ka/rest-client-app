import { screen, waitFor, within } from '@testing-library/react';
import { render } from './test-utils/test-utils';
import { describe, test, beforeEach, vi, expect } from 'vitest';
import React from 'react';
import * as ReactMod from 'react';
import enMessages from '@/shared/i18n/messages/en.json';
import type { RequestHistoryItem } from '@/app/[locale]/history/request-history.type';

vi.mock('@ant-design/v5-patch-for-react-19', () => ({}));

vi.mock('@/shared/i18n/navigation', () => ({
  Link: (props: React.ComponentProps<'a'>) => <a {...props} />,
}));

const themeHoist = vi.hoisted(() => {
  const ThemeCtx = ReactMod.createContext<{ themeValue: 'light' | 'dark' }>({
    themeValue: 'light',
  });
  return { ThemeCtx };
});
vi.mock('@/context/theme-context', () => ({
  ThemeContext: themeHoist.ThemeCtx,
}));

vi.mock('@/shared/utils/sort-by-timestamp', async () => {
  const mod = await vi.importActual<typeof import('@/shared/utils/sort-by-timestamp')>(
    '@/shared/utils/sort-by-timestamp'
  );
  return mod;
});

const makeItem = (
  id: string,
  ts: string,
  status = 200,
  method: 'GET' | 'POST' = 'GET'
): RequestHistoryItem => ({
  id,
  url: `/api/${id}`,
  method,
  timestamp: ts,
  durationMs: 100,
  statusCode: status,
  requestSize: 10,
  responseSize: 20,
});

describe('HistoryView', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await vi.resetModules();
  });

  test('renders empty state when history is empty', async () => {
    vi.doMock('@/app/[locale]/history/mock-data', () => ({
      mockHistory: [] as RequestHistoryItem[],
    }));

    const { default: HistoryView } = await import('@/app/[locale]/history/history-client');
    const { container } = render(
      <themeHoist.ThemeCtx.Provider value={{ themeValue: 'light' }}>
        <HistoryView />
      </themeHoist.ThemeCtx.Provider>
    );

    expect(screen.getByRole('heading', { name: enMessages.History.title })).toBeInTheDocument();

    await waitFor(() => {
      const emptyEl = container.querySelector('.ant-empty');
      expect(emptyEl).toBeInTheDocument();

      const w = within(emptyEl as HTMLElement);
      expect(w.getByText(enMessages.History.emptyTitle)).toBeInTheDocument();
      expect(w.getByText(enMessages.History.emptySubtitle)).toBeInTheDocument();
    });

    const btn = screen.getByRole('button', { name: enMessages.History.goRestClient });
    expect(btn).toBeInTheDocument();
    const link = btn.closest('a');
    expect(link).toHaveAttribute('href', '/rest-client');
  });

  test('renders list when history present and sorts by timestamp desc', async () => {
    const items = [
      makeItem('1', '2024-02-01T10:00:00Z', 200, 'GET'),
      makeItem('2', '2024-03-01T10:00:00Z', 404, 'POST'),
      makeItem('3', '2024-01-01T10:00:00Z', 200, 'GET'),
    ];
    vi.doMock('@/app/[locale]/history/mock-data', () => ({ mockHistory: items }));

    const { default: HistoryView } = await import('@/app/[locale]/history/history-client');
    const { container } = render(
      <themeHoist.ThemeCtx.Provider value={{ themeValue: 'dark' }}>
        <HistoryView />
      </themeHoist.ThemeCtx.Provider>
    );

    await waitFor(() => {
      const itemsEls = container.querySelectorAll('.ant-collapse-item');
      expect(itemsEls.length).toBe(3);
    });

    const rows = container.querySelectorAll('.ant-row');
    expect(rows[0]?.textContent).toContain('/api/2');

    expect(screen.getAllByText('404')[0]).toHaveClass('ant-typography');

    const firstLink = screen.getAllByRole('link', { name: /\/api\// })[0] as HTMLAnchorElement;
    expect(firstLink).toHaveAttribute('href', '/rest-client');
    expect(firstLink.className).toMatch(/link--dark/);
  });

  test('expands panel and shows details with translated labels', async () => {
    const items = [makeItem('a', '2024-05-01T12:00:00Z', 500, 'GET')];
    vi.doMock('@/app/[locale]/history/mock-data', () => ({ mockHistory: items }));

    const { default: HistoryView } = await import('@/app/[locale]/history/history-client');
    const { container } = render(
      <themeHoist.ThemeCtx.Provider value={{ themeValue: 'light' }}>
        <HistoryView />
      </themeHoist.ThemeCtx.Provider>
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-collapse')).toBeInTheDocument();
    });

    (container.querySelector('.ant-collapse-item .ant-collapse-header') as HTMLElement).click();

    await waitFor(() => {
      expect(screen.getByText(`${enMessages.History.duration}:`)).toBeInTheDocument();
      expect(screen.getByText(`${enMessages.History.requestSize}:`)).toBeInTheDocument();
      expect(screen.getByText(`${enMessages.History.responseSize}:`)).toBeInTheDocument();
      expect(screen.getByText(`${enMessages.History.timestamp}:`)).toBeInTheDocument();
    });
  });
});
