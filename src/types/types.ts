export type ThemeValue = 'light' | 'dark';

export type ThemeContextType = {
  themeValue: ThemeValue;
  setThemeValue: (theme: ThemeValue) => void;
};

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}
