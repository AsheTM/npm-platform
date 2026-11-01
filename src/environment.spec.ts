import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';

import { isBrowser, isServer, isWebWorker } from './environment.ts';
import { stubGlobal } from './testing/global.ts';

let restores: (() => void)[] = [];

const stub: (name: string, value: unknown) => void = (name, value) => {
  restores.push(stubGlobal(name, value));
};

// Fakes the globals of a dedicated web worker: `self` is an instance of `WorkerGlobalScope`
const stubWebWorker: () => void = () => {
  class WorkerGlobalScope {}

  stub('WorkerGlobalScope', WorkerGlobalScope);
  stub('self', new WorkerGlobalScope());
};

afterEach(() => {
  restores.reverse().forEach((restore) => restore());
  restores = [];
});

describe('isBrowser', () => {
  it('should return true when `window` and `navigator` exist', () => {
    // GIVEN
    stub('window', {});
    stub('navigator', {});

    // WHEN
    const result: boolean = isBrowser();

    // THEN
    assert.equal(result, true);
  });

  it('should return false on Node, which defines `navigator` but not `window`', () => {
    // GIVEN
    // tests run on Node 24, where `navigator` exists and `window` does not

    // WHEN
    const result: boolean = isBrowser();

    // THEN
    assert.equal(result, false);
  });

  it('should return false when `navigator` is missing', () => {
    // GIVEN
    stub('window', {});
    stub('navigator', undefined);

    // WHEN
    const result: boolean = isBrowser();

    // THEN
    assert.equal(result, false);
  });

  it('should return false in a web worker', () => {
    // GIVEN
    stubWebWorker();

    // WHEN
    const result: boolean = isBrowser();

    // THEN
    assert.equal(result, false);
  });
});

describe('isWebWorker', () => {
  it('should return true when `self` is a `WorkerGlobalScope`', () => {
    // GIVEN
    stubWebWorker();

    // WHEN
    const result: boolean = isWebWorker();

    // THEN
    assert.equal(result, true);
  });

  it('should return false when `WorkerGlobalScope` is missing', () => {
    // GIVEN
    // tests run on Node 24, where `WorkerGlobalScope` does not exist

    // WHEN
    const result: boolean = isWebWorker();

    // THEN
    assert.equal(result, false);
  });

  it('should return false when `self` is not a `WorkerGlobalScope`', () => {
    // GIVEN
    class WorkerGlobalScope {}

    stub('WorkerGlobalScope', WorkerGlobalScope);
    stub('self', {});

    // WHEN
    const result: boolean = isWebWorker();

    // THEN
    assert.equal(result, false);
  });
});

describe('isServer', () => {
  it('should return true on Node', () => {
    // GIVEN
    // tests run on Node 24, where `window` and `WorkerGlobalScope` do not exist

    // WHEN
    const result: boolean = isServer();

    // THEN
    assert.equal(result, true);
  });

  it('should return false in a browser', () => {
    // GIVEN
    stub('window', {});
    stub('navigator', {});

    // WHEN
    const result: boolean = isServer();

    // THEN
    assert.equal(result, false);
  });

  it('should return false in a web worker', () => {
    // GIVEN
    stubWebWorker();

    // WHEN
    const result: boolean = isServer();

    // THEN
    assert.equal(result, false);
  });
});
