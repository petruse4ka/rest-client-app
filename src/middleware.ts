import createMiddleware from 'next-intl/middleware';
import { routing } from './shared/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { AUTH_ROUTES, PROTECTED_ROUTES, appRoutes } from './shared/config/navigation';
import axios from 'axios';

export function splitLocale(pathname: string) {
  const seg = pathname.split('/');
  const maybeLocale = seg[1];
  const locale = routing.locales.includes(maybeLocale) ? maybeLocale : routing.defaultLocale;
  const rest = routing.locales.includes(maybeLocale) ? `/${seg.slice(2).join('/')}` : pathname;
  return { locale, restPathname: rest || '/' };
}

export function withLocale(locale: string, pathname: string) {
  return `/${locale}${pathname}`;
}

const intl = createMiddleware(routing);

const isAuthRoute = (path: string) => AUTH_ROUTES.some((p) => path === p);
const isProtected = (path: string) => PROTECTED_ROUTES.some((p) => path.startsWith(p));

export async function middleware(req: NextRequest) {
  const intlResponse = intl(req);

  const { pathname } = req.nextUrl;
  const session = req.cookies.get('session')?.value || null;

  const { locale, restPathname } = splitLocale(pathname);

  let isValid = false;

  if (session) {
    try {
      const res = await fetch(`${req.nextUrl.origin}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session),
      });

      isValid = res.ok;
    } catch {
      return null;
    }
  }

  if (isValid && isAuthRoute(restPathname)) {
    const url = req.nextUrl.clone();
    url.pathname = withLocale(locale, appRoutes.home);
    return NextResponse.redirect(url);
  }

  if (!isValid && isProtected(restPathname)) {
    const url = req.nextUrl.clone();
    url.pathname = withLocale(locale, appRoutes.home);
    return NextResponse.redirect(url);
  }

  return intlResponse;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
