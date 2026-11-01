# @ashetm/platform

``@ashetm/platform`` is a small, dependency-free library of environment checks (browser, server, web worker, browser abilities). Every check is safe to call on the server (Node, SSR): none of them throws `window is not defined`.

It is plain TypeScript (no framework), shipped as ESM with type definitions and `"sideEffects": false`.

## Install

You can install it with npm:

```bash
npm install @ashetm/platform
```

## API

```ts
import { hasMediaDevices, isBrowser, isSecureContext, isServer, isWebWorker } from '@ashetm/platform';
```

### Environment

| Function        | Returns `true` when                                                                  |
|-----------------|--------------------------------------------------------------------------------------|
| `isBrowser()`   | `window` and `navigator` exist (a browser page).                                     |
| `isWebWorker()` | the code runs inside a web worker (`self` is a `WorkerGlobalScope`).                 |
| `isServer()`    | the code runs neither in a browser page nor in a web worker (Node, SSR, Deno, Bun).  |

Node 21+ defines a global `navigator`, so `isBrowser()` checks `window` too: it is `false` on Node.

### Browser abilities

| Function            | Returns `true` when                                                                          |
|---------------------|----------------------------------------------------------------------------------------------|
| `isSecureContext()` | the page or worker runs in a [secure context](https://developer.mozilla.org/docs/Web/Security/Secure_Contexts) (HTTPS, `localhost`). `false` on the server. |
| `hasMediaDevices()` | `navigator.mediaDevices` exists (camera, microphone). `false` on the server, in web workers and on insecure (`http`) pages. |

## Example

```ts
import { hasMediaDevices } from '@ashetm/platform';

export async function getCamera(): Promise<MediaStream | null> {
  if (!hasMediaDevices()) {
    return null;
  }

  return navigator.mediaDevices.getUserMedia({ video: true });
}
```

## Development

Node 24 (see `.nvmrc`).

```bash
npm install
npm run typecheck
npm test
npm run build
```

Tests use the Node test runner (`node --test`) and run the TypeScript sources directly.
