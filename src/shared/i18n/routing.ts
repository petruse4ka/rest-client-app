import { defineRouting } from 'next-intl/routing';
import { languages } from '../config';

const languagesKey = languages.map((language) => language.key);

export const routing = defineRouting({
  locales: languagesKey,
  defaultLocale: 'en',
});
