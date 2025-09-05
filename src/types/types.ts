export type ThemeValue = 'light' | 'dark';

export type ThemeContextType = {
  themeValue: ThemeValue;
  setThemeValue: (theme: ThemeValue) => void;
};
