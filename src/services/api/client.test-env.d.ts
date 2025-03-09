import { SpyInstance } from 'vitest';

declare global {
  // eslint-disable-next-line no-var
  var fetch: SpyInstance;
}

export {};
