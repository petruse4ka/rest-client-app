declare module 'postman-code-generators' {
  import { Request } from 'postman-collection';

  const codegen: {
    getLanguageList(): LanguageItem[];
    convert: (
      language: string,
      variant: string,
      request: Request,
      options: Record<string, unknown>,
      callback: (error: Error | null, snippet: string) => void
    ) => void;
  };

  export default codegen;
}
