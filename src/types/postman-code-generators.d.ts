interface Variant {
  key: string;
}

interface LanguageItem {
  key: string;
  label: string;
  syntax_mode: string;
  variants: Variant[];
}

declare module 'postman-code-generators' {
  const sdk: {
    getLanguageList(): LanguageItem[];
  };

  export default sdk;
}
