// Browser-safe JSON type used by both client and server modules. Anything a
// server function returns must be serializable, so this is the shared shape.
export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
