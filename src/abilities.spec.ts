import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';

import { hasMediaDevices, isSecureContext } from './abilities.ts';
import { stubGlobal } from './testing/global.ts';

let restores: (() => void)[] = [];

const stub: (name: string, value: unknown) => void = (name, value) => {
  restores.push(stubGlobal(name, value));
};

afterEach(() => {
  restores.reverse().forEach((restore) => restore());
  restores = [];
});

describe('isSecureContext', () => {
  it('should return true in a secure context', () => {
    // GIVEN
    stub('isSecureContext', true);

    // WHEN
    const result: boolean = isSecureContext();

    // THEN
    assert.equal(result, true);
  });

  it('should return false in an insecure context', () => {
    // GIVEN
    stub('isSecureContext', false);

    // WHEN
    const result: boolean = isSecureContext();

    // THEN
    assert.equal(result, false);
  });

  it('should return false on Node, which does not define `isSecureContext`', () => {
    // GIVEN
    // tests run on Node 24, where `isSecureContext` does not exist

    // WHEN
    const result: boolean = isSecureContext();

    // THEN
    assert.equal(result, false);
  });
});

describe('hasMediaDevices', () => {
  it('should return true when `navigator.mediaDevices` exists', () => {
    // GIVEN
    stub('navigator', { mediaDevices: {} });

    // WHEN
    const result: boolean = hasMediaDevices();

    // THEN
    assert.equal(result, true);
  });

  it('should return false when `navigator.mediaDevices` is missing, as on insecure pages', () => {
    // GIVEN
    stub('navigator', {});

    // WHEN
    const result: boolean = hasMediaDevices();

    // THEN
    assert.equal(result, false);
  });

  it('should return false on Node, which defines `navigator` without `mediaDevices`', () => {
    // GIVEN
    // tests run on Node 24, where `navigator` exists without `mediaDevices`

    // WHEN
    const result: boolean = hasMediaDevices();

    // THEN
    assert.equal(result, false);
  });

  it('should return false when `navigator` is missing', () => {
    // GIVEN
    stub('navigator', undefined);

    // WHEN
    const result: boolean = hasMediaDevices();

    // THEN
    assert.equal(result, false);
  });
});
