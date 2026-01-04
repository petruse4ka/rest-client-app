import { useTranslations } from 'next-intl';

export function useFormatters() {
  const t = useTranslations('History');

  function formatMs(ms: number) {
    if (ms === 0) return '—';
    return `${ms} ${t('ms')}`;
  }

  function formatBytes(bytes: number) {
    if (bytes === 0) return '—';

    const mod10 = bytes % 10;
    const mod100 = bytes % 100;
    let unit: string;

    if (mod10 === 1 && mod100 !== 11) {
      unit = t('bytes_one');
    } else if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
      unit = t('bytes_few');
    } else {
      unit = t('bytes_many');
    }

    return `${bytes} ${unit}`;
  }

  return { formatMs, formatBytes };
}
