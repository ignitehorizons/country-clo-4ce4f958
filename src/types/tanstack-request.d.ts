// TanStack Start injects these request utilities into server-function handlers
// at build time via the server-fn Vite transform. They are not exported from
// `@tanstack/react-start` (importing them is a type error); they are available
// as bare calls inside createServerFn handlers. This ambient declaration lets
// tsc resolve them.
// Docs: TanStack Start "Request Utilities" — available inside .handler().

declare function getRequest(): Request;
declare function getRequestHeader(name: string): string | undefined;
declare function setResponseHeader(name: string, value: string): void;
declare function setResponseStatus(code: number): void;
