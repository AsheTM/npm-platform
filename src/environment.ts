// Not in the DOM lib, only defined inside web workers
declare const WorkerGlobalScope: abstract new () => object;

// Node 21+ defines a global `navigator`, so `window` is checked too
export const isBrowser: () => boolean = () => typeof window !== 'undefined' && typeof navigator !== 'undefined';

export const isWebWorker: () => boolean = () =>
  typeof WorkerGlobalScope !== 'undefined' && typeof self !== 'undefined' && self instanceof WorkerGlobalScope;

// Node, SSR, Deno, Bun: anything that is neither a browser page nor a web worker
export const isServer: () => boolean = () => !isBrowser() && !isWebWorker();
