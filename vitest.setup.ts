import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

declare global {
  const test: typeof import('vitest')['test'];
  const expect: typeof import('vitest')['expect'];
  const vi: typeof import('vitest')['vi'];
  const describe: typeof import('vitest')['describe'];
}

afterEach(() => {
  cleanup();
});
