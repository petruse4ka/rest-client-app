export type ThemeValue = 'light' | 'dark';

export type ThemeContextType = {
  themeValue: ThemeValue;
  setThemeValue: (theme: ThemeValue) => void;
};

export type VariablesData = {
  key: number;
  variable: string;
  value: string;
};
