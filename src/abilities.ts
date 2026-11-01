// `globalThis.isSecureContext` is read because this export shadows the global of the same name
export const isSecureContext: () => boolean = () => globalThis.isSecureContext === true;

// `navigator.mediaDevices` is missing on the server, in web workers and on insecure (http) pages
export const hasMediaDevices: () => boolean = () => typeof navigator !== 'undefined' && navigator.mediaDevices != null;
