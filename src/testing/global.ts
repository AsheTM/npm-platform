// Replaces a global (`window`, `navigator`, ...) for one test; call the returned function to restore it
export const stubGlobal: (name: string, value: unknown) => () => void = (name, value) => {
  const original: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(globalThis, name);

  Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });

  return () => {
    if (original) {
      Object.defineProperty(globalThis, name, original);
    } else {
      delete (globalThis as Record<string, unknown>)[name];
    }
  };
};
