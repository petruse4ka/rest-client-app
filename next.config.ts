import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: false,
  },
};

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');

export default withNextIntl(nextConfig);
