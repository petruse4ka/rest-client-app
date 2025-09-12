import CatchAllPage from '@/app/[locale]/[...reset]/page';

const mockNotFound = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', () => ({
  notFound: mockNotFound,
}));

describe('CatchAllPage', () => {
  test('calls notFound when executed', () => {
    CatchAllPage();

    expect(mockNotFound).toHaveBeenCalled();
  });
});
